import { Box } from '@mui/system'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function UserBadgeItem({user, handleFunction}) {
  return (
    <Box onClick={handleFunction} sx={{
        padding: '2px',
        borderRadius:'5px',
        margin:'2px',
        variant: 'solid',
        fontSize: '12px',
        color: 'white',
        width: '20%',
        height: '22px',
        backgroundColor: 'green',
        cursor: 'pointer',
    }}> 
    <span style={{padding: '0 2px'}}>{user.name}</span>
    <CloseIcon fontSize='string'/>
    </Box>
  );
}

export default UserBadgeItem;