import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import { ChatState } from '../../Context/ChatProvider'
import Chat from '../../components/Chat/Chat'
import './ChatPage.css'

function ChatPage() {
  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
        <div className='chat_room'>
        {user && (
          <Sidebar fetchAgain={fetchAgain} />)}
        {user && (
          <Chat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
        </div>
  )
}

export default ChatPage;