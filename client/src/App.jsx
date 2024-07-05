import React, {useState, useEffect} from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from './assets';
import{ Home, CreatePost, YourImage} from './pages';
import { Dialog } from './components';

const App = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userInitial, setUserInitial] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [savedUsername, setSavedUsername] = useState('')

  const handleUsername=(savedUsername)=>{
    setSavedUsername(savedUsername);
  };
  const openDialog=()=>{
    setShowDialog(true);
  };
  const closeDialog=()=>{
    setShowDialog(false);
  };  
  const handleLoggedin=(initial)=>{
    setUserInitial(initial);
    setIsLoggedin(true);
    closeDialog();
  };
  const handleLoggedout=()=>{
    setIsLoggedin(false);
    setShowDropdown(false);
    setUserInitial('');
  };
  const toggleDropdown=()=>{
    setShowDropdown(!showDropdown);
  };


  return(
    <BrowserRouter >
      <header className="w-full flex justify-between items-center bg-white
      sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo"
          className="w-28 object-contain"/>
        </Link>

        <header className="justify-center items-center font-bold">
          Haolin's AI Image Generator
        </header>


        <div className="flex space-x-4">
          <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>

          <Link
          to="/your-image"
          className="font-inter font-medium bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Your images
          </Link>

          {isLoggedin ? (
            <div className="relative" >
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white"
              >
                {userInitial}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <Link
                    to="/your-image"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Your Images
                  </Link>
                  <button
                    onClick={handleLoggedout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )  :(
          <button
            onClick={openDialog}
            className="flex font-inter font-medium rounded-md border border-gray-300 hover:bg-gray-100 px-4 py-2"
          >
            Log in
          </button>
          )}
        </div>


      </header>
      <main className="sm:p-8 px-4 py-8 w-full
      bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path ="/create-post" element={<CreatePost isLoggedin = {isLoggedin} savedUsername={savedUsername} />}/>
          <Route path ="/your-image" element={<YourImage savedUsername={savedUsername} isLoggedin={isLoggedin}/>}/>
        </Routes>
      </main>
      <Dialog showDialog={showDialog} closeDialog={closeDialog} onLogin={handleLoggedin} savedUsername={handleUsername}/>
    </BrowserRouter>
  )
}

export default App




