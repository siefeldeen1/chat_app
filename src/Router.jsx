import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import ChatPage from './pages/chat_Page/chatPage';


export default function Router() {
  return useRoutes([
    {path: '/', element:  <ChatPage/> },
    {path: '/chat/:id', element:  <ChatPage/> },
    // {path: '/Home', element:  <Home/> },
    {path: '/About_us', element:  <ChatPage/> },
    {path: '/Terms', element:  <ChatPage/> },
    {path: '/login', element:  <Login/> },
    {path: '/signup', element:  <Signup/> },

    ])

}
