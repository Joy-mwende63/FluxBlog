from app import app, db
from models import User, Post, Comment, Tag, PostTag

# Example of seeding data for User
user1 = User(username="user1", email="user1@example.com", password_hash="hashedpassword1")
user2 = User(username="user2", email="user2@example.com", password_hash="hashedpassword2")

# Example of seeding data for Tags
tags = [
    Tag(name="Python"),
    Tag(name="Flask"),
    Tag(name="Web Development")
]

# Seed the database within the app context
with app.app_context():
    # Check if user already exists before adding
    existing_user1 = User.query.filter_by(username=user1.username).first()
    if existing_user1:
        print(f"User with username {user1.username} already exists!")
    else:
        db.session.add(user1)
        db.session.commit()  # Commit after adding the user to ensure the ID is assigned
        print(f"User {user1.username} added successfully.")

    existing_user2 = User.query.filter_by(username=user2.username).first()
    if existing_user2:
        print(f"User with username {user2.username} already exists!")
    else:
        db.session.add(user2)
        db.session.commit()  # Commit after adding the user to ensure the ID is assigned
        print(f"User {user2.username} added successfully.")
    
    # Check if tags already exist before adding
    for tag in tags:
        existing_tag = Tag.query.filter_by(name=tag.name).first()
        if existing_tag:
            print(f"Tag with name {tag.name} already exists!")
        else:
            db.session.add(tag)
            print(f"Tag {tag.name} added successfully.")
    
    # Commit all tags in one go
    db.session.commit()

    # Seed Posts with image URLs
    post1 = Post(
        content="Flask is a micro web framework that is easy to learn.",
        image_url="https://www.pexels.com/photo/several-laboratory-glasses-1366944/",  # Example image URL
        user_id=user1.id  # Use the ID after committing user1
    )
    post2 = Post(
        content="Learn advanced Python techniques and improve your coding skills.",
        image_url="https://example.com/images/python_advanced.jpg",  # Example image URL
        user_id=user2.id  # Use the ID after committing user2
    )
    db.session.add_all([post1, post2])
    db.session.commit()

    # Seed PostTags (many-to-many relationship between Post and Tag)
    post_tag1 = PostTag(post_id=post1.id, tag_id=2)  # Post 1 is tagged with Flask
    post_tag2 = PostTag(post_id=post1.id, tag_id=3)  # Post 1 is tagged with Web Development
    post_tag3 = PostTag(post_id=post2.id, tag_id=1)  # Post 2 is tagged with Python
    db.session.add_all([post_tag1, post_tag2, post_tag3])
    db.session.commit()

    # Seed Comments
    comment1 = Comment(content="Great post on Flask!", post_id=post1.id, user_id=user2.id)
    comment2 = Comment(content="I learned a lot from this Python tutorial.", post_id=post2.id, user_id=user1.id)
    db.session.add_all([comment1, comment2])
    db.session.commit()

    print("Seeding completed.")
