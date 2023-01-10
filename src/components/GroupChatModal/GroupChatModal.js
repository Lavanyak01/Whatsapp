import {Box, Button, Modal} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';
import CloseIcon from '@mui/icons-material/Close';
import { uri } from '../../App';

function GroupChatModal({children}) {
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {user, chats, setChats} = ChatState();

  const handleSearch= async(query)=>{
    setSearch(query);
    if(!query) {
      return;
    }
    try {
      setLoading(true);
      const config={
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`${uri}/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async ()=> {
    if(!groupChatName || ! selectedUsers){
      //code for toast
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }; 
      const { data } = await axios.post(`${uri}/api/chat/group`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u)=> u._id)),
      }, config);
      setChats([data, ...chats]);
      setOpen(false);
    } catch (error) {}
  };

  const handleGroup =(userToAdd)=> {
    if(selectedUsers.includes(userToAdd)) {
      //code for toast
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser)=>{
    setSelectedUsers(
      selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  return (
    <div className='chat_modal'>
    <span onClick={handleOpen}>{children}</span>
    <Modal open={open}>
        <Box sx={style}>
          <CloseIcon sx={{float: 'right', cursor: 'pointer'}} onClick={handleClose}/>
           <h3>Create Group Chat</h3>
           <form>
            <input type='text' placeholder='Chat Name' onChange={(e)=> setGroupChatName(e.target.value)}/>
            <input type='text' placeholder='Add Users' onChange={(e)=> handleSearch(e.target.value)}/>
           </form>
           <Box sx={{width: '100%', display: 'flex', flexWrap: 'wrap'}}>
            {selectedUsers.map((u) => (
              <UserBadgeItem key={u._id} user={u}
                handleFunction={()=>handleDelete(u)}
              />
            ))}
          </Box>
              {loading ? ( <div>loading...</div> ) : (
                searchResult?.slice(0,1).map((user)=> (
                  <UserListItem 
                      key={user._id} user={user} handleFunction={()=> handleGroup(user)} 
                  />))
              )}
           <Button onClick={handleSubmit} sx={{background: '#075e54', color: 'white',float: 'right' ,'&:hover':{background: '#075e54', color: 'white'}}}>Create Chat</Button>
        </Box>
      </Modal>
    </div>
)}

export default GroupChatModal