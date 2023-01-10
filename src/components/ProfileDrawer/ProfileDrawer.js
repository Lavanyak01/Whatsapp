import React from 'react';
import { Drawer } from '@mui/material';
import { ArrowBack } from '@mui/icons-material'
import { ChatState } from '../../Context/ChatProvider';
import './ProfileDrawer.css';

function ProfileDrawer({ open, setOpen }) {
  const drawerStyle = {
    left: 25,
    top: 35,
    height: '700px',
    width: '370px',
    boxShadow: 'none',
    borderRadius: '10px',
    background: '#dadbd3'
  }
  const { user } = ChatState();
  return (
    <Drawer
      open={open}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1500 }}
    >
      <div className='profile_info'>
        <div className='title_info'>
          <ArrowBack onClick={() => setOpen(false)} sx={{ marginTop: '40px' , cursor: 'pointer'}} />
          <h2>Profile</h2>
        </div>
        <img src={user.pic} alt='profile_pic' />
        <div className='info_name'>
          <h3>Your Name</h3>
          <p>{user.name}</p>
        </div>
        <div className='info_name'>
          <h3>About</h3>
          <p>Hey there! I am using Whatsapp</p>
        </div>
        <br />
        <p>This is not your username or pin. This name will be visible to your whatsapp accounts.</p>
      </div>

    </Drawer>
  )
}

export default ProfileDrawer;