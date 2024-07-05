import React, { useState } from 'react';
import Register from './SignUp';

const Dialog = ({ showDialog, closeDialog, onLogin, savedUsername}) => {
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');

  const openRegister=() =>{
    setShowRegister(true);
  };

  const closeRegister=()=>{
    setShowRegister(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    // Handle login logic here (e.g., send username and password to server)
    try{
      const normalizedUsername = username.toLowerCase();
      const response = await fetch('http://localhost:8080/api/v1/login/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: normalizedUsername, password }),
      
      });
      const data = await response.json();
      
      if (response.ok) {
        // Handle successful login
        console.log('Login successful:', data);
        alert('Log in Successfully!')
        const initial = username.charAt(0).toUpperCase();
        onLogin(initial);
        savedUsername(username);
        // Reset form fields or close modal after successful login
        setUsername('');
        setPassword('');
        closeDialog();

      } else {
        // Handle login error
        console.error('Login error:', data.message);
        console.log('username does not exsit')
        alert('Username does not exist, please sign up!')
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('error while log in')
      }
  };

  const handleOverlayClick = (event) => {
    // Close modal only if the click is on the overlay (outside modal content)
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <>
      {showDialog && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center" onClick={handleOverlayClick}>
          <div className="bg-white p-8 rounded-lg w-96">
            <header className='flex justify-center items-center text-black text-bold text-sm mb-2'>
              Log in with your credentials
            </header>
            {/* Login Form */}
            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                
                
                <label className="block mb-2 font-medium">Username</label>
                
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Log in
              </button>
              
            </form>
           <div className='mt-3 flex justify-center items-center'>
            <p>
              Don't have an account?
            </p>
            <button 
            onClick={openRegister}
            className='text-blue-500 hover:text-blue-700'>
              Sign up
            </button>
           </div> 
          </div>
          <Register showRegister={showRegister} closeRegister={closeRegister} />
        </div>
      )}
    </>
  );
};

export default Dialog;
