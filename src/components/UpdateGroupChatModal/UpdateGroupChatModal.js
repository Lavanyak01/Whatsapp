import { Visibility } from '@mui/icons-material';
import { Box,  IconButton, Modal } from '@mui/material';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import './UpdateGroupChatModal.css';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import UserListItem from '../UserAvatar/UserListItem';
import { toast} from 'react-toastify';
import { uri } from '../../App';

function UpdateGroupChatModal({fetchAgain, setFetchAgain, fetchMessages}) {
  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const {selectedChat, setSelectedChat, user} = ChatState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemove=async (user1)=>{
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
        toast.error("Only admins can remove someone!");
        return;
    }
    try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          `${uri}/api/chat/groupremove`,
          {
            chatId: selectedChat._id,
            userId: user1._id,
          },
          config
        );
  
        user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        fetchMessages();
        setLoading(false);
      } catch (error) {setLoading(false)}
  };
  const handleAddUser=async(user1)=> {
    if(selectedChat.users.find((u)=> u._id === user1._id)) {
      toast.error('User already in Group!');
        return;
    } 
    if(selectedChat.groupAdmin._id !== user._id){
       toast.error('Only admins can add someone!');
        return;
    }
    try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put( `${uri}/api/chat/groupadd`,
          {
            chatId: selectedChat._id,
            userId: user1._id,
          },
          config
        );
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
      } catch (error) { setLoading(false)}
  };
  const handleRename=async (e)=>{
    e.preventDefault();
    if(!groupChatName) return;
    try{
        setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },};
      const { data } = await axios.put(
        `${uri}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        }, 
          config 
        );
        console.log(data._id);
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
        setOpen(false);
    }catch (error){
        toast.error('Error Occured!');
        setRenameLoading(false);
    }
    setGroupChatName('');
  };
  const handleSearch= async (query)=>{
    setSearch(query);
    if (!query) {
      return;
    }
    try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${uri}/api/user?search=${search}`, config);
        console.log(data);
        setLoading(false);
        setSearchResult(data);
    } catch(error) {
      toast.error('Error Occured', {
      position: 'top-center'
    });
      setLoading(false);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  return (
    <div>
        <IconButton onClick={handleOpen}>
             <Visibility />
        </IconButton>
      <Modal open={open}>
        <Box sx={style}>
          <CloseIcon sx={{position: 'absolute', right: '20px', cursor: 'pointer'}} onClick={handleClose}/>
          <h3 className='group_name'>{selectedChat.chatName}</h3> 
          <Box sx={{width:'100%', display: 'flex',flexWrap: 'wrap', justifyContent:'center', margin: '5px'}} >
            {selectedChat.users.map((u) => (
                <UserBadgeItem key={u._id}
                  user={u} handleFunction={()=>handleRemove(u)}
                />
            ))}
          </Box>
          <form className='form_update'>
            <input type='text' placeholder='Chat Name' value={groupChatName}  
              onChange={(e) => setGroupChatName(e.target.value)} />
              <button className='update_btn' isLoading={renameloading}
                onClick={handleRename}>Update</button>
          </form>
          <form className='form_add'>
            <input type='text' placeholder='Add User to Group' 
              onChange={(e) => handleSearch(e.target.value)} />
          </form>
          {loading ? (
            <LoadingButton loading />
          ) : (
            searchResult?.map((user, index)=> (
                <UserListItem
                    key={index}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
          <button className='leave_btn' onClick={()=> handleRemove(user)}>Leave Group</button>
        </Box>
      </Modal>
    </div>
  )
}

export default UpdateGroupChatModal