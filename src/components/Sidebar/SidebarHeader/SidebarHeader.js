import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';
import React, { useState } from 'react'
import ProfileDrawer from '../../ProfileDrawer/ProfileDrawer';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../../Context/ChatProvider';

function SidebarHeader() {
    const {user} = ChatState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleDrawer = () => {
        setOpenDrawer(true)
    }

    const navigate= useNavigate();
    const logoutHandler = () =>{
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
  return (
    <>
      <Avatar src={user.pic} onClick={()=>toggleDrawer()} sx={{cursor: 'pointer'}}/>
        
        <div className='sidebar_headerRight'>
         <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton onClick={handleClick} >
            <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              id='basic-menu'
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={()=>{handleClose();setOpenDrawer(true);}}>Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>   
            <ProfileDrawer open={openDrawer} setOpen={setOpenDrawer} />    
        </div>
    </>
  )
}

export default SidebarHeader