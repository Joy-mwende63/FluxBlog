import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar

function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const homepageStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh'
  };

  const postStyle = {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={homepageStyle}>
      <Navbar />
      <h1 style={{ textAlign: 'center', color: '#333' }}>Homepage</h1>
      {posts.map(post => (
        <div key={post.id} style={postStyle}>
          <img src={post.image_url} alt="Post" style={{ width: '100%', borderRadius: '8px' }} />
          <p style={{ marginTop: '10px' }}>{post.content}</p>
          <button style={buttonStyle}>Like</button>
          <button style={buttonStyle}>Comment</button>
        </div>
      ))}
    </div>
  );
}

export default Homepage;