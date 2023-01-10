import './App.css';
import ChatPage from './pages/ChatPage/ChatPage';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import { AppBar} from '@mui/material';
import SignUp from './pages/SignUp/SignUp';

export const uri = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className='app'>
      <AppBar className='top_bar'/>
      <div className='app_body'>
      <Routes>
        <Route path='/' exact element={<SignUp />} />
        <Route path="/login" element={<Login />}/>
        <Route path='/Chats' element={<ChatPage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
