import React, { useState } from 'react';
import Dialog from './Dialog';

const Register = ({ showRegister, closeRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const openDialog=()=>{
    setShowDialog(true);
  };
  const closeDialog=()=>{
    setShowDialog(false);
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
      const response = await fetch('http://localhost:8080/api/v1/login/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: normalizedUsername, password}),
      });
      const data = await response.json();
      if (response.ok) {
        // Handle successful register
        console.log('Register successful:', data);
        alert('Succesfully registered!')
        // Reset form fields or close modal after successful login
        setUsername('');
        setPassword('');
        closeRegister();
      } else {
        // Handle login error
        console.error('Register error:', data.message);
        console.log('username already exsit')
        alert('Username already exist, please sign in!')
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('error while register')
      }
  };

  const handleOverlayClick = (event) => {
    // Close modal only if the click is on the overlay (outside modal content)
    if (event.target === event.currentTarget) {
      closeRegister();
    }
  };

  return (
    <>
      {showRegister && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center" onClick={handleOverlayClick}>
          <div className="bg-white p-8 rounded-lg w-96">
            <header className='flex justify-center items-center text-black text-bold text-sm mb-2'>
              Sign Up
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
                Sign up
              </button>
              
            </form>
           <div className='mt-3 flex justify-center items-center'>
            <p>
              Already have an account?
            </p>
            <button onClick={openDialog} className='text-blue-500 hover:text-blue-700'>
              Log in
            </button>
           </div> 
          </div>
          <Dialog showDialog={showDialog} closeDialog={closeDialog} />
        </div>
      )}
    </>
  );
};

export default Register;
