import React, { useState } from "react";
import { Container, Card, Form } from "react-bootstrap";
import { Heart, Send } from "lucide-react"; // Using Send for Share

const FreedomWall = () => {
  const initialPosts = [
    {
      id: 1,
      author: "Anonymous",
      date: "March 21 at 6:59 PM",
      content:
        "I was doing fine, but you just came and ruined my peace of mind. PLS.. let me go back to the time when I completely didn’t have any idea you exist. It is hard to sleep when there’s so much on your mind.",
      likes: 34,
      shares: 50,
      liked: false,
      shared: false,
    },
    {
      id: 2,
      author: "Anonymous",
      date: "March 21 at 6:59 PM",
      content:
        '"How is your life?" Ito unti-unting nilulunod ng kalungkutan na paulit-ulit lang...',
      likes: 120,
      shares: 113,
      liked: false,
      shared: false,
    },
  ];

  const [posts, setPosts] = useState(initialPosts);

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
          : post
      )
    );
  };

  const handleShare = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, shares: post.shared ? post.shares - 1 : post.shares + 1, shared: !post.shared }
          : post
      )
    );
  };

  return (
    <Container className="freedom-wall-container">
      <div className="header">
        <h2 className="title">Freedom Wall</h2>
        <p className="description">
          Express yourself freely, share your thoughts, struggles, victories, or uplifting messages with our community.
        </p>
      </div>
    
      {/* New Post Input */}
      <Card className="post-input-card">
        <div className="post-input">
          <div className="avatar">F</div>
          <Form.Control type="text" placeholder="What's on your mind?" className="post-input-field" />
        </div>
      </Card>

      {/* Displaying Posts */}
       {/* Displaying Posts */}
    <div className="post-list">
      {posts.map((post) => (
        <Card className="post-card" key={post.id}>
          <Card.Body>
            <div className="post-header">
              <div className="avatar">C</div>
              <div>
                <Card.Title className="post-author">{post.author}</Card.Title>
                <Card.Subtitle className="post-date">{post.date}</Card.Subtitle>
              </div>
            </div>
            <Card.Text className="post-content">{post.content}</Card.Text>
            <div className="post-actions">
              {/* Like & Share Buttons in the same row */}
              <div className="action-group">
                <div className="like-button" onClick={() => handleLike(post.id)}>
                  <Heart color={post.liked ? "red" : "black"} fill={post.liked ? "red" : "none"} size={18} className="me-1" />
                  <small>{post.likes}</small>
                </div>
                <div className="share-button" onClick={() => handleShare(post.id)}>
                  <Send color={post.shared ? "blue" : "black"} fill={post.shared ? "blue" : "none"} size={18} className="me-1" />
                  <small>{post.shares}</small>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
    </Container>
  );
};

export default FreedomWall;