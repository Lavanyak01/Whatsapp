import React, { useEffect, useState } from 'react';
import { Avatar, Box, Stack } from "@mui/material"
import './SidebarChat.css';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import ChatLoading from '../ChatLoading/ChatLoading';
import { getSender, getSenderImg } from '../../config/ChatLogics';
import { uri } from '../../App';

function SidebarChat({fetchAgain}) {
  // eslint-disable-next-line
  const [loggedUser, setLoggedUser] = useState();
  const { user, chats, setChats,selectedChat, setSelectedChat} = ChatState();

  const fetchChats= async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`${uri}/api/chat`, config);
      setChats(data);
    } catch (error) {}
  }

  useEffect(()=> {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  
  return (
    <>
    <div>
      {chats ? (
        <Stack>
        {chats.map((chat)=>(
          <Box onClick={()=>setSelectedChat(chat)} key={chat._id} 
               backgroundColor={selectedChat === chat ? '#38B2AC' : 'white'}
               color={selectedChat === chat ? 'white': 'black'}
          >
          <div className='sidebarChat'>
          {!chat.isGroupChat? (
               <div className='sidebar_data'>
               <Avatar src={getSenderImg(user, chat.users)} />
               <h3>{getSender(user, chat.users)}</h3>
               </div>
           ) : (
               <div className='sidebar_data'>
                <Avatar />
                <h3>{chat.chatName}</h3>
               </div>
           )}
          <div className='sidebarChat_info'>
            {chat.latestMessage && (
              <p className='message_text'>
                <b>{chat.latestMessage.sender.name} :</b> 
                {chat.latestMessage.content.length > 50
                 ? chat.latestMessage.content.subString(0, 51) + '...'
                 : chat.latestMessage.content}
              </p>
            )}
          </div>
          </div>
          </Box>
        ))}
        </Stack>
      ) : ( <ChatLoading />)}
      </div>
    </>
  );
}

export default SidebarChat