import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/HomePage.js';
import PostPage from './components/PostPage.js';
import ProfilePage from './components/ProfilePage.js';
import LoginPage from './components/LoginPage.js';
import SignUpPage from './components/SignUpPage.js';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setUser(response.data);
    } catch (error) {
      console.log('Login failed');
    }
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/logout');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          {!user ? (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </div>
          ) : (
            <div>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
