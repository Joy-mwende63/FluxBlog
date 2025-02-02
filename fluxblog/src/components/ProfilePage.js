import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile');
        setUserProfile(response.data);
      } catch (error) {
        console.log('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="profilePage">
      {userProfile ? (
        <>
          <h1>{userProfile.username}'s Profile</h1>
          <p>Email: {userProfile.email}</p>
          <div className="profilePosts">
            <h2>Your Posts</h2>
            {userProfile.posts && userProfile.posts.length > 0 ? (
              userProfile.posts.map(post => (
                <div key={post.id} className="profilePost">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
              ))
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
