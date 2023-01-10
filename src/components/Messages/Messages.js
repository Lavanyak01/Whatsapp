import { Avatar, Tooltip } from '@mui/material';
import React from 'react';
import { isLastMessage, isSameSender, isSameSenderMargin} from '../../config/ChatLogics';
import { ChatState } from '../../Context/ChatProvider';

function Messages({messages}) {
    const {user} = ChatState();
  return (
      <div>
          {messages &&
              messages.map((m, i) => (
                  <div style={{display: 'flex'}} key={i}>
                      {(isSameSender(messages, m, i, user._id) || 
                        isLastMessage(messages, i, user._id)) && (
                            <Tooltip title={m.sender.name} placement='bottom-start' >
                            <Avatar src={m.sender.pic} sx={{ cursor: 'pointer', margin:'1px',height: '30px', width: '30px'}}/>
                            </Tooltip>
                        )}
                        <span style={{
                            backgroundColor: `${
                                m.sender._id === user._id ? '#dcf8c6' : '#ffffff'
                            }`,
                            borderRadius: '20px',
                            padding: '5px 15px',
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            marginBottom:'3px'
                        }}>
                            {m.content}
                        </span>
                    </div>
              ))}
      </div>
  )
}

export default Messages;