// App.js

'use client'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import SignIn from './components/SignUp/SignIn'
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/ErrorPages/404_page'
import { BsRobot } from "react-icons/bs";
import { FloatButton, Popover } from 'antd';
import ChatbotModal from './components/ChatBot/Chatbot'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
    {isChatOpen && <ChatbotModal setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen}/>}
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard/*" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    {/* Making the customer support icon */}
    <Popover placement="left" content="AI Customer Support" title="" trigger="hover">
      <FloatButton icon={<BsRobot className='hover:text-purple-900'/>} className='shadow-4' onClick={
        () => setIsChatOpen(!isChatOpen)
      }/>
    </Popover>
    </>


  )
}

export default App;
