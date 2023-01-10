import React, { useState } from 'react';
import './Sidebar.css';
import axios from 'axios';
import {ArrowBack, SearchOutlined} from '@mui/icons-material';
import { Box, Button, Drawer, Tooltip } from '@mui/material';
import SidebarChat from './SidebarChat';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChatState} from '../../Context/ChatProvider';
import ChatLoading from '../ChatLoading/ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import AddIcon from '@mui/icons-material/Add';
import GroupChatModal from '../GroupChatModal/GroupChatModal';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import { uri } from '../../App';

function Sidebar({fetchAgain}) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats} = ChatState();
  const [open, setOpen] = useState(false);
  
  const handleSearch =async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`${uri}/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch(error) {}
  }

  const accessChat = async (userId) => {
    try{
      setLoadingChat(true);

      const config = {
        headers: {
          'Content-type': "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };    
      
      const {data} = await axios.post(`${uri}/api/chat`, {userId}, config);
      if(!chats.find((c)=> c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
    } catch (error) {}
  };

  const drawer={
    width: '300px',
    height: '100%',
  }

  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
         <SidebarHeader />
      </div>
      <div className='sidebar_search'>
          <Tooltip title='Search Users to chat' placement='bottom'>
          <div className='sidebar_searchContainer'>
              <Button onClick={()=>setOpen(true)}>
                <SearchOutlined sx={{color: 'gray'}}/>
              </Button>
              <Drawer open={open} PaperProps={{ sx: drawer }} anchor={"bottom"} >
                <div className='search_user'>
                  <ArrowBack onClick={() => {setOpen(false)}} sx={{cursor: 'pointer'}}/>
                  <h2> Search User</h2>
                </div>
                <Box display='flex' p={2}>
                  <input placeholder='Search by name or email'
                      value={search} style={{width:'70%', borderRadius:'1px'}} 
                      onChange={(e)=> setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </Box>
                {loading ? <ChatLoading /> : 
                (
                  searchResult?.map((user)=> (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={()=> accessChat(user._id)}
                    />
                  )))}
                {loadingChat &&  <LoadingButton loading />}
              </Drawer>
            <input placeholder='Search or start a new chat' type='text' onClick={()=>setOpen(true)}/>
          </div>
          </Tooltip>
      </div>
      <div className='sidebar_chats'>
        <SidebarChat fetchAgain={fetchAgain}/>
        <GroupChatModal >
          <Button variant='outlined' sx={{ position: "fixed", bottom: "6%",left: '18.5%',width: '10%',background: '#075e54',color: 'white',fontSize: 'x-small','&:hover': {background: '#075e54', color: 'white'}}}
           startIcon={<AddIcon />}
          >New Group</Button>
        </GroupChatModal>
      </div>
    </div>
  )
}

export default Sidebar;