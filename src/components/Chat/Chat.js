import React from 'react';
import './Chat.css';
import SingleChat from '../SingleChat/SingleChat';

function Chat({ fetchAgain, setFetchAgain }) {
  return (
    <div className='chat'>
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </div>
  )
}

export default Chat;