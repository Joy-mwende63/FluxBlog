import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled-components
const FormContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(to right, #ff7f50, #ff6f61); /* Gradient background */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #fff; /* Light text color for contrast */
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #fff;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    border-color: #ffb6b9;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #fff;
  border-radius: 6px;
  min-height: 150px;
  font-size: 16px;

  &:focus {
    border-color: #ffb6b9;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #ffb6b9; /* Lighter coral color */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    background-color: #ff8c8f;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const PostContainer = styled.div`
  margin-top: 30px;
  background: linear-gradient(to right, #fbc2eb, #a6c1ee); /* Soft gradient */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #333;
  }

  p {
    color: #555;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CommentContainer = styled.div`
  margin-top: 20px;
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h3 {
    color: #ff6f61;
  }

  p {
    color: #555;
  }
`;

const CommentButton = styled.button`
  padding: 8px 15px;
  background-color: #17a589;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    background-color: #148f74;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

function PostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');

  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    // Fetch all posts on load
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('You need to be logged in to create a post.');
      return;
    }

    const newPost = {
      title,
      content,
      image_url: imageUrl,
      user_id: userId,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('http://localhost:5000/api/posts', newPost, config);
      console.log('Post created:', response.data);
      
      // Fetch posts again after creating a new post
      const postsResponse = await axios.get('http://localhost:5000/api/posts');
      setPosts(postsResponse.data);

      setTitle('');
      setContent('');
      setImageUrl('');
      setError('');
    } catch (error) {
      console.error('Failed to create post:', error);
      setError('Failed to create post. Please try again later.');
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(`http://localhost:5000/api/posts/${postId}/like`, {}, config);
      console.log('Post liked:', response.data);

      // Update posts with new like count
      const postsResponse = await axios.get('http://localhost:5000/api/posts');
      setPosts(postsResponse.data);
    } catch (error) {
      console.error('Failed to like post:', error);
      setError('Failed to like post. Please try again later.');
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { content: newComment },
        config
      );
      console.log('Comment added:', response.data);

      // Fetch posts again to include new comment
      const postsResponse = await axios.get('http://localhost:5000/api/posts');
      setPosts(postsResponse.data);

      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      setError('Failed to add comment. Please try again later.');
    }
  };

  return (
    <FormContainer>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmitPost}>
        <div>
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <TextArea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <Input
            type="url"
            id="image_url"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </div>
        <Button type="submit">Add Post</Button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {posts.map((post) => (
        <PostContainer key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.image_url && <img src={post.image_url} alt="Post" />}
          <div>
            <button onClick={() => handleLikePost(post.id)}>Like ({post.likes})</button>
          </div>
          <CommentContainer>
            <h3>Comments:</h3>
            {post.comments && post.comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
              </div>
            ))}
            <TextArea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
            />
            <CommentButton onClick={() => handleCommentSubmit(post.id)}>Submit Comment</CommentButton>
          </CommentContainer>
        </PostContainer>
      ))}
    </FormContainer>
  );
}

export default PostPage;
