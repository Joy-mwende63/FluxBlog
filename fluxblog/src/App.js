import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostPage from './components/PostPage';
import Homepage from './components/HomePage';  // Ensure correct import
import LoginPage from './components/LoginPage';  // Ensure correct import
import SignupPage from './components/SignUpPage';  // Ensure correct import
import ProfilePage from './components/ProfilePage';  // If you have a ProfilePage

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar appears on all pages */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
