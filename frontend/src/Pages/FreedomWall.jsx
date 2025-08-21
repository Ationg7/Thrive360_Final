import React, { useState } from "react";
import { Container, Card, Form, Modal, Button } from "react-bootstrap";
import { Heart, Send, Image, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react"; // Import Emoji Picker

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
      image: null,
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
      image: null,
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const handlePost = () => {
    if (newPost.trim() === "" && !selectedImage) return; // Prevent empty posts

    const newPostEntry = {
      id: posts.length + 1,
      author: "Anonymous",
      date: new Date().toLocaleString(),
      content: newPost,
      likes: 0,
      shares: 0,
      liked: false,
      shared: false,
      image: selectedImage,
    };

    setPosts([newPostEntry, ...posts]);
    setNewPost("");
    setSelectedImage(null);
    setShowPostModal(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setNewPost((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selecting
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      <Card className="post-input-card" onClick={() => setShowPostModal(true)}>
        <div className="post-input">
          <div className="avatar">A</div>
          <Form.Control type="text" placeholder="What's on your mind?" className="post-input-field" readOnly />
        </div>
      </Card>

      {/* Floating Post Window */}
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="post-modal-content">
            <div className="post-header">
              <div className="avatar">A</div>
              <span className="author-name">Anonymous</span>
            </div>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What's on your mind?"
              className="post-textarea"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />

            {/* Image Preview */}
            {selectedImage && (
              <div className="image-preview">
                <img src={selectedImage} alt="Selected" className="img-fluid" />
              </div>
            )}

            {/* Add to your post section */}
            <div className="add-post-container">
              <Button variant="light" className="add-post-btn">
                Add to your post
                <div className="add-post-icons">
                  <label htmlFor="image-upload">
                    <Image size={20} className="post-icon" />
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <Smile size={20} className="post-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                </div>
              </Button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handlePost}>Post</Button>
        </Modal.Footer>
      </Modal>

      {/* Displaying Posts */}
      <div className="post-list">
        {posts.map((post) => (
          <Card className="post-card" key={post.id}>
            <Card.Body>
              <div className="post-header">
                <div className="avatar">A</div>
                <div>
                  <Card.Title className="post-author">{post.author}</Card.Title>
                  <Card.Subtitle className="post-date">{post.date}</Card.Subtitle>
                </div>
              </div>
              <Card.Text className="post-content">{post.content}</Card.Text>

              {/* Display Image if available */}
              {post.image && <img src={post.image} alt="Post" className="img-fluid post-image" />}

              <div className="post-actions">
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
