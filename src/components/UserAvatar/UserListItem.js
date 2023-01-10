import { Avatar, Box } from '@mui/material'
import React from 'react'

function UserListItem({user, handleFunction}) {
  return (
    <Box  onClick={handleFunction}
        sx={{
          cursor: "pointer",
          display: 'flex',
          alignItems: 'center',
          color: 'black',
          width: '100%',
          height: '6px',
          paddingTop: 3,
          paddingLeft: 2,
          paddingBottom: 3,
          marginBottom: 2,
          backgroundColor: '#E8E8E8',
          '&:hover': {
                backgroundColor: '#38B2AC',
                color: 'white'
          }
        }}
    >
        <Avatar  sx={{marginRight: 2}}
            size="sm"
            cursor="pointer"
            src={user.pic}
        />
        <div>
        <h4>{user.name}</h4>
        <p style={{fontSize:'xs', color: 'black'}} ><b>Email :</b> {user.email}</p>
        </div>
    </Box>
  );
}

export default UserListItem