# FluxBlog

FluxBlog is a modern blogging platform where users can create, like, and comment on blog posts. The platform features user authentication, post creation, comment systems, and profile management. Built using **Flask** (for the backend) and **React** (for the frontend), FluxBlog provides an engaging user experience with a responsive design.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profile.
- **Create Posts**: Logged-in users can create posts with content and images.
- **Like Posts**: Users can like posts.
- **Comment System**: Users can comment on posts.
- **Responsive Design**: The platform is mobile-friendly.

## Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Flask, Flask-SQLAlchemy, Flask-CORS, Flask-Migrate, Flask-Bcrypt
- **Database**: SQLite (development)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Styled-components

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fluxblog.git
cd fluxblog

### 2. Backend Setup(flask)

##Install Python dependencies

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt

## 2.2 Set up environment variables

Create a .env file in the backend directory and add the following variables:

env
Copy code
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=sqlite:///./user.db  # SQLite for local development
SECRET_KEY=your_secret_key

###2.3. Initialize the database
Run the following commands to initialize and migrate the database:

```bash
Copy code
flask db init
flask db migrate
flask db upgrade


###2.4. Run the Flask server

```bash
# Copy code
flask run
Your Flask server will be running on http://localhost:5000.

# 3. Frontend Setup (React)
##3.1. Install React dependencies
``bash
Copy code
cd frontend
npm install

# 3.2. Run the React development server
``bash
Copy code
npm start
Your React frontend will be running on http://localhost:3000.

# 4. Connecting Frontend and Backend
Ensure both the frontend and backend are running. The frontend (React) will interact with the Flask backend via API calls at http://localhost:5000/api.

You may need to configure the API URLs in your React components to point to the correct backend endpoints.

# Usage
Login: Navigate to /login to log in with your credentials.
Sign Up: Use /signup to create a new account.
Homepage: After logging in, the homepage will display posts. You can like posts, comment on them, and create new posts.
Create Post: Go to /post to add a new blog post with a title, content, and an optional image.
Profile: View and update your profile at /profile.

# API Endpoints
Here are the available API endpoints:

POST /api/posts: Create a new post
GET /api/posts: Get all posts
GET /api/posts/{id}: Get a specific post by ID
PATCH /api/posts/{id}/like: Like a post
POST /api/posts/{id}/comment: Add a comment to a post
GET /api/posts/{id}/comments: Get comments for a post
DELETE /api/posts/{id}: Delete a post
POST /api/auth/login: Log in a user
POST /api/auth/signup: Sign up a new user


# Example API Usage
Create a new post
```bash
Copy code
POST /api/posts
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "My First Post",
  "content": "This is the content of the first post",
  "image_url": "https://example.com/image.jpg",
  "user_id": 1
}
Like a post
```bash
Copy code
PATCH /api/posts/{postId}/like
Authorization: Bearer YOUR_JWT_TOKEN
Add a comment to a post

```bash
Copy code
POST /api/posts/{postId}/comment
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "content": "Great post!"
}
Contribution
We welcome contributions to FluxBlog! Here's how you can contribute:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add new feature').
Push to your branch (git push origin feature-name).
Open a pull request.
License
Distributed under the MIT License. See LICENSE for more details.

Happy coding! 😃

```yaml
Copy code

---

This **coded README** contains all the steps necessary for setting up both the backend and frontend of your **FluxBlog** platform. The API usage section also provides example requests for interacting with the backend. Feel free to adjust or expand as needed!







