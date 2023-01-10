import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-toastify';
import { uri } from '../../App';

function SignUp() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState();

  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const postDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "whatsapp");
      data.append("cloud_name", "dlo81n0qy");
      fetch("https://api.cloudinary.com/v1_1/dlo81n0qy/image/upload ", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!name || !email || !password) {
      toast.error('Please fill all the fields', {
        position: "top-center",
        });
        return;
    }
    try {
        const config = {
            headers: { 'Content-type': "application/json"},
        };
        const { data } = await axios.post(`${uri}/api/user`,
        {name, email,password, pic,}, config);
        console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/chats');
    } catch(error) {}
};

  return (
    <div className='signUp'>
        <div className='_container'>
        <div className='_left_side'>
            <div className='left_content'>
                <h3>Create a new account</h3>
                <div className='_form'>
                    <form onSubmit={submitHandler}>
                        <input type='text' name='name' 
                         placeholder='Enter Your Name' value={name}
                         onChange={(e) => setName(e.target.value)}
                        />
                        <input type='email' name='email' 
                         placeholder='Enter Your Email' value={email}
                         onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='input_password'>
                            <input type={show ? 'text' : 'password'} name='password' 
                             placeholder='Password' value={password}
                             onChange={(e) => setPassword(e.target.value)}
                            />
                            <div onClick={handleClick} className='password-show'>
                              {show ? "Hide" : "show"}
                            </div>
                        </div>
                        <div className='_user_pic'>
                        <label>Upload your picture:</label>
                        <input type='file'
                        accept='image/*'
                        onChange={(e) => postDetails(e.target.files[0])}
                        />
                        </div>
                        <button type='submit' >Submit</button>
                    </form>
                </div>
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
                <Link to='/login'>
                <button>Sign In</button>
                </Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SignUp;