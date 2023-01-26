import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uri } from '../../App';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);

const submitHandler = async (e) => {
  e.preventDefault();
  if(!email || !password) {
    toast.error('Please fill all the fields', {
      position: "top-center",
      });
      return;
  }
  try{
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${uri}/api/user/login`,
      { email, password },
      config
    );
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/chats');
  } catch(err) {
    toast.error('Please check your details!', {
      position: "top-center",
      });
  }
}

  return (
    <div className='login'>
      <div className='container'>
        <div className='_left_side'>
            <div className='_user_image'></div>
            <h3>Sign In Your Account</h3>
            <div className='_form'>
                <form onSubmit={submitHandler}>
                    <input type='email' value={email}
                     placeholder='Enter Email' 
                     onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type='password' value={password}
                     placeholder='Enter Password' 
                     onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
        <div className='_right_side'>
            <div className='_right_content'>
                <img src='https://cdn-icons-png.flaticon.com/512/124/124034.png?w=360'
                    alt='whatsapp-icon'
                    className='_right_content_icon' 
                />
                <h2>Hey you, Welcome</h2>
                <p> WhatsApp is a cross-platform centralized instant messaging and voice-over-IP service owned by Meta Platforms, Inc.</p>
                <Link to='/'>
                <button>Sign Up</button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
