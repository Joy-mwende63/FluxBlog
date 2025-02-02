from app import app, db
from models import User, Post, Comment, Tag, PostTag

with app.app_context():
    # Seed Users
    user1 = User(username="user1", email="user1@example.com", password_hash="hashedpassword1")
    user2 = User(username="user2", email="user2@example.com", password_hash="hashedpassword2")
    db.session.add_all([user1, user2])
    db.session.commit()

    # Seed Tags
    tag1 = Tag(name="Python")
    tag2 = Tag(name="Flask")
    tag3 = Tag(name="Web Development")
    db.session.add_all([tag1, tag2, tag3])
    db.session.commit()

    # Seed Posts with image URLs
    post1 = Post(
        content="Flask is a micro web framework that is easy to learn.",
        image_url="https://example.com/images/flask_intro.jpg",  # Example image URL
        user_id=1
    )
    post2 = Post(
        content="Learn advanced Python techniques and improve your coding skills.",
        image_url="https://example.com/images/python_advanced.jpg",  # Example image URL
        user_id=2
    )
    db.session.add_all([post1, post2])
    db.session.commit()

    # Seed PostTags (many-to-many relationship between Post and Tag)
    post_tag1 = PostTag(post_id=1, tag_id=2)  # Post 1 is tagged with Flask
    post_tag2 = PostTag(post_id=1, tag_id=3)  # Post 1 is tagged with Web Development
    post_tag3 = PostTag(post_id=2, tag_id=1)  # Post 2 is tagged with Python
    db.session.add_all([post_tag1, post_tag2, post_tag3])
    db.session.commit()

    # Seed Comments
    comment1 = Comment(content="Great post on Flask!", post_id=1, user_id=2)
    comment2 = Comment(content="I learned a lot from this Python tutorial.", post_id=2, user_id=1)
    db.session.add_all([comment1, comment2])
    db.session.commit()

    print("Seeding completed.")