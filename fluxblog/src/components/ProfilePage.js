import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  padding: 40px;
  background: linear-gradient(135deg, #f0f8ff, #e0e0ff);
  min-height: 100vh;
  text-align: center;
`;

const ProfileHeader = styled.h1`
  color: #4a90e2;
  font-size: 36px;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const InfoText = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  font-family: 'Helvetica', sans-serif;
`;

const PostsContainer = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 700px;
  margin: 0 auto;
  border: 2px solid #e0e0e0;
`;

const Post = styled.div`
  background: linear-gradient(135deg, #fafafa, #ffffff);
  margin: 15px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  h3 {
    color: #e91e63;
    font-size: 24px;
    margin-bottom: 12px;
    font-family: 'Georgia', serif;
  }

  p {
    color: #555;
    font-size: 16px;
    line-height: 1.6;
    font-family: 'Verdana', sans-serif;
  }
`;

const LoadingText = styled.p`
  font-size: 20px;
  color: #888;
  text-align: center;
  font-style: italic;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
`;

function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        setError('Failed to fetch user profile. Please try again.');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <LoadingText>Loading...</LoadingText>;

  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <Container>
      {userProfile ? (
        <>
          <ProfileHeader>{userProfile.username}'s Profile</ProfileHeader>
          <InfoText>Email: {userProfile.email}</InfoText>
          <PostsContainer>
            <h2 style={{ color: '#673ab7', fontSize: '24px' }}>Your Posts</h2>
            {userProfile.posts && userProfile.posts.length > 0 ? (
              userProfile.posts.map((post) => (
                <Post key={post.id}>
                  <h3>{post.title || 'Untitled Post'}</h3>
                  <p>{post.content}</p>
                </Post>
              ))
            ) : (
              <InfoText>No posts yet.</InfoText>
            )}
          </PostsContainer>
        </>
      ) : (
        <InfoText>User profile not available.</InfoText>
      )}
    </Container>
  );
}

export default ProfilePage;
