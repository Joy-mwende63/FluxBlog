import React, { useState, useEffect } from 'react';
import axios from 'axios';


function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post');
        setPosts(response.data);
      } catch (error) {
        console.log('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="homePage">
      <h1>Welcome to FluxBlog</h1>
      <div className="postsList">
        {posts.map(post => (
          <div key={post.id} className="postItem">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <img src={post.image_url} alt="Post" />
            <a href={`/post/${post.id}`} className="viewPostBtn">View Post</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
