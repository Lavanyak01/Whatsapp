import { ArrowBack, AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import { ChatState } from '../../Context/ChatProvider';
import './SingleChat.css';
import {getSender, getSenderImg} from '../../config/ChatLogics'
import UpdateGroupChatModal from '../UpdateGroupChatModal/UpdateGroupChatModal';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import Messages from '../Messages/Messages';
import io from 'socket.io-client';
import { uri } from '../../App';

const ENDPOINT = "https://whatsapp-server-6afx.onrender.com/";
var socket, selectedChatCompare;

function SingleChat({fetchAgain, setFetchAgain}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `${uri}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch(error) {}
  }

  const sendMessage = async(event)=> {
    if(event.key === "Enter" && newMessage) {
      event.preventDefault();
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${uri}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch(error){}
    }
  };


  useEffect(()=> {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if(!selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageReceived.chat._id) { 
            if (!notification.includes(newMessageReceived)) {
              setNotification([newMessageReceived, ...notification]);
              setFetchAgain(!fetchAgain);
            }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  })

  const typingHandler = (e)=> {
    setNewMessage(e.target.value);
    if(!socketConnected) return;
  };
  return (
    <>
     {selectedChat ? (
        <div className='single_chat'>
            <div className='chat_header'>
            <div className='chat_headerInfo'>
              <div className='chat_details'>
                <IconButton ><ArrowBack onClick={()=> setSelectedChat('')}/></IconButton>
                {messages && 
                (!selectedChat.isGroupChat ? (
                    <>
                    <Avatar src={getSenderImg(user, selectedChat.users)} />
                    <h3>{getSender(user, selectedChat.users)}</h3>
                    </>
                ) : (
                    <>
                     <Avatar />
                     <h3>{selectedChat.chatName.toUpperCase()}</h3>
                    </>
                ))}
              </div>
            </div>
            <div className='chat_headerRight'>
            {!selectedChat.isGroupChat ? (
              <>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
              </>
            ): (
              <>
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>
              </>
            )}
            </div>
          </div>
          <div className='chat_body'>
          { loading ? <LoadingButton loading /> :  <Messages messages={messages} /> }
          </div>    
          <div className='chat_footer'>
            <IconButton >
              <InsertEmoticon />
            </IconButton>
            <form onKeyDown={sendMessage}>
              <input
                placeholder="Type a message"
                type="text" onChange={typingHandler} value={newMessage}
              />
            </form>
            <IconButton>
                <AttachFile />
            </IconButton>
            <MicIcon />
          </div>
        </div>
     ) : (
        <div className='emptyChat'>
            <img src='https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg' 
            alt='emptyChat' style={{width: '400px', marginTop:'150px'}}/>
            <h2 className='img_text'>Whatsapp Web</h2>
            <p className='subtext'>Now send and receive without keeping your phone online.</p>
            <p className='subtext'>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
        </div>
     )}
        
    </>

  )
}

export default SingleChat
