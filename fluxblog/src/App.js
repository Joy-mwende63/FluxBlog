import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage.js';
import PostPage from './components/PostPage.js';
import ProfilePage from './components/ProfilePage.js';
import LoginPage from './components/LoginPage.js';
import SignupPage from './components/SignUpPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
