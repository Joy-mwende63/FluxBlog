from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from models import db, User, Post, Comment, Tag, PostTag
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize the Flask extensions
db.init_app(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = Post(content=data['content'], image_url=data['image_url'], user_id=data['user_id'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.to_dict()), 201

@app.route('/api/comments', methods=['POST'])
def create_comment():
    data = request.get_json()
    new_comment = Comment(content=data['content'], post_id=data['post_id'], user_id=data['user_id'])
    db.session.add(new_comment)
    db.session.commit()
    return jsonify(new_comment.to_dict()), 201

@app.route('/api/like', methods=['POST'])
def like_post():
    data = request.get_json()
    post = Post.query.get(data['post_id'])
    if post:
        post.likes += 1
        db.session.commit()
        return jsonify(post.to_dict()), 200
    return jsonify({'message': 'Post not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
