import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(to right, #a8c0ff, #b0e0e6);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #fff;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    border-color: #b0e0e6;
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
    border-color: #b0e0e6;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #a8c0ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    background-color: #b0e0e6;
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
  background: linear-gradient(to right, #f7d0f7, #e6f0f3);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

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
  background-color: #f0f8ff;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h3 {
    color: #a8c0ff;
  }

  p {
    color: #555;
  }
`;

const CommentButton = styled.button`
  padding: 8px 15px;
  background-color: #b0e0e6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s ease;

  &:hover {
    background-color: #a8c0ff;
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
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('You need to be logged in to create a post.');
      return;
    }

    if (!userId) {
      setError('User information is missing.');
      return;
    }

    const newPost = {
      title,
      content,
      image_url: imageUrl,
      user_id: userId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Post created:', data);
        await fetchPosts(); // Reload posts after creating a new one
        setTitle('');
        setContent('');
        setImageUrl('');
        setError('');
      } else {
        setError('Failed to create post. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      setError('Failed to create post. Please try again later.');
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchPosts(); // Update posts after liking
    } catch (error) {
      console.error('Failed to like post:', error);
      setError('Failed to like post. Please try again later.');
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment) return;

    try {
      await fetch(
        `http://localhost:5000/api/posts/${postId}/comment`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newComment }),
        }
      );
      await fetchPosts(); // Update posts to include new comment
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
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <Input
            type="url"
            id="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
            <button onClick={() => handleLikePost(post.id)}>
              Like ({post.likes || 0})
            </button>
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
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <CommentButton onClick={() => handleCommentSubmit(post.id)}>
              Submit Comment
            </CommentButton>
          </CommentContainer>
        </PostContainer>
      ))}
    </FormContainer>
  );
}

export default PostPage;
