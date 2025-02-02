import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import styled from 'styled-components';

const HomepageContainer = styled.div`
  font-family: 'Arial, sans-serif';
  padding: 20px;
  background: linear-gradient(to bottom, #f8b400, #ff9a00); /* Gradient background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  font-size: 40px;
  margin-bottom: 40px;
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Soft shadow for the title */
`;

const PostCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-width: 600px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  max-height: 300px;
`;

const PostContent = styled.p`
  color: #555;
  margin-top: 15px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.primary ? '#007BFF' : '#17A589')};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#13856a')};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ff9a00;
    outline: none;
  }
`;

function Homepage() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleLikePost = async (postId) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('Please log in to like a post');
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Post liked:', response.data);
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: response.data.likes } : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentPost = async (postId) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('Please log in to comment on a post');
      return;
    }

    if (!comment) {
      alert('Please enter a comment');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, 
        { content: comment }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Comment added:', response.data);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('Please log in to delete a post');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Post deleted:', response.data);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <HomepageContainer>
      <Title>WELCOME TO FLUXBLOG</Title>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post.id}>
            {post.image_url && <PostImage src={post.image_url} alt="Post" />}
            <PostContent>{post.content}</PostContent>
            <ButtonContainer>
              <ActionButton primary onClick={() => handleLikePost(post.id)}>Like</ActionButton>
              <ActionButton onClick={() => handleCommentPost(post.id)}>Comment</ActionButton>
              <ActionButton onClick={() => handleDeletePost(post.id)}>Delete</ActionButton>
            </ButtonContainer>
            <CommentInput 
              type="text" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              placeholder="Write a comment..." 
            />
          </PostCard>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </HomepageContainer>
  );
}

export default Homepage;
