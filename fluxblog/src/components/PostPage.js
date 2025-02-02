import React, { useState, useEffect } from 'react';
import axios from 'axios';


function PostPage({ match }) {
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/post/${match.params.id}`);
        setPost(response.data);
      } catch (error) {
        console.log('Failed to fetch post');
      }
    };

    fetchPost();
  }, [match.params.id]);

  return (
    <div className="postPage">
      {post ? (
        <>
          <h1>{post.title}</h1>
          <img src={post.image_url} alt="Post" className="postImage" />
          <p>{post.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostPage;
