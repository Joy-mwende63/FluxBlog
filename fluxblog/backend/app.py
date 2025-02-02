from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager, create_access_token
from models import db, User, Post, Comment, Tag, PostTag
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize the Flask extensions
db.init_app(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate
jwt = JWTManager(app)

# Route to handle user signup
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'message': 'Username already taken'}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# Route to handle user login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')  # Assuming email is used for login
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        # Create a JWT token
        access_token = create_access_token(identity=user.id)  # Use user.id for the JWT identity
        return jsonify({
            "message": "Login successful",
            "access_token": access_token
        }), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401


# Route to get all posts
@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        posts_data = [post.to_dict() for post in posts]
        return jsonify(posts_data), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching posts', 'error': str(e)}), 500

# Route to create a new post
@app.route('/api/posts', methods=['POST'])
@jwt_required()
def create_post():
    current_user = get_jwt_identity()
    data = request.json

    # Sample response to show that JWT works
    return jsonify({
        'message': f'Post created by user {current_user}',
        'post_data': data
    }), 201

# Route to create a new comment
@app.route('/api/posts/<int:post_id>/comment', methods=['GET'])
def get_comments(post_id):
    post = Post.query.get_or_404(post_id)
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([comment.to_dict() for comment in comments]), 200


# Route to like a post
@app.route('/api/posts/<int:post_id>/like', methods=['PATCH'])
@jwt_required()
def like_post(post_id):
    post = Post.query.get_or_404(post_id)
    post.likes += 1  # Increment likes count
    db.session.commit()
    return jsonify({"message": "Post liked", "likes": post.likes}), 200


# Route to fetch user profile details (logged-in user)
@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user:
        posts = Post.query.filter_by(user_id=user.id).all()
        user_data = {
            "username": user.username,
            "email": user.email,
            "posts": [post.to_dict() for post in posts],
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"message": "User not found"}), 404

# Route to delete a post
@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
