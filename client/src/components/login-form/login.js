import React from 'react'
import './login.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className='wrapper'>
        <form action=''>
            <h1>Login</h1>
            <div className='input-box'>
            <input type='text' placeholder='username' required autocomplete="nope" />

                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type='password' placeholder='password' required />
                <FaLock className='icon'/>
            </div>
            <div className='remember-forgot'>
                <label><input type='checkbox'/>Remember me</label>
                <button onClick={() => {}}>forgot password?</button>
            </div>
            <button type='submit'>login</button>
            <div className='register-link'>
                <p>Don't have an account?<button onClick={() => {}}>Register</button></p>
            </div>
        </form>
    </div>
  )
}

export default Login;
