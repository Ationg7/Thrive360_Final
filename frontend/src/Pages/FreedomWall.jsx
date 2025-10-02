import React, { useState, useEffect } from "react";
import { Container, Card, Form, Modal, Button, Dropdown, Alert } from "react-bootstrap";
import { Heart, Send, Image, Smile } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useAuth } from "../AuthContext";
import { freedomWallAPI } from "../services/api";
import "./FreedomWall.css";

const FreedomWall = () => {
  const { isLoggedIn } = useAuth(); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [showUndo, setShowUndo] = useState(false);

  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportPostId, setReportPostId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const reportReasons = [
    "Spam or misleading",
    "Harassment or bullying",
    "Hate speech or violence",
    "Nudity or sexual content",
    "Self-harm or dangerous acts",
    "Other",
  ];

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const postsData = await freedomWallAPI.getPosts();
      setPosts(postsData);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const badWords = ["badword1", "badword2", "badword3"];
  const censorText = (text) => {
    let censored = text;
    badWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      censored = censored.replace(regex, "*".repeat(word.length));
    });
    return censored;
  };

  const handleLike = async (id) => {
    try {
      const result = await freedomWallAPI.likePost(id);
      setPosts(posts.map(post => 
        post.id === id 
          ? { ...post, likes: result.likes }
          : post
      ));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleShare = async (id) => {
    try {
      const result = await freedomWallAPI.sharePost(id);
      setPosts(posts.map(post => 
        post.id === id 
          ? { ...post, shares: result.shares }
          : post
      ));
    } catch (err) {
      console.error('Error sharing post:', err);
    }
  };

  const handlePost = async () => {
    if (newPost.trim() === "" && !selectedImage) return;

    try {
      const postData = {
        content: newPost,
        image: selectedImage,
      };

      const newPostEntry = await freedomWallAPI.createPost(postData);
      
      // Format the response to match our UI expectations
      const formattedPost = {
        ...newPostEntry,
        author: "Anonymous",
        date: new Date(newPostEntry.created_at).toLocaleString(),
        liked: false,
        shared: false,
        image: newPostEntry.image_path ? `/storage/${newPostEntry.image_path}` : null,
      };

      setPosts([formattedPost, ...posts]);
      setNewPost("");
      setSelectedImage(null);
      setShowPostModal(false);
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewPost((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
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

  const openReportModal = (id) => {
    setReportPostId(id);
    setShowReportModal(true);
  };

  const submitReport = () => {
    console.log(`Post ${reportPostId} reported for reason: ${selectedReason}`);
    setShowReportModal(false);
    setSelectedReason("");
    alert("Report submitted. Thank you for your feedback!");
  };

  const handleHide = (id) => {
    const postToHide = posts.find((post) => post.id === id);
    if (postToHide) {
      setHiddenPosts([postToHide, ...hiddenPosts]);
      setPosts(posts.filter((post) => post.id !== id));
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 5000);
    }
  };

  const undoHide = () => {
    setPosts([...hiddenPosts, ...posts]);
    setHiddenPosts([]);
    setShowUndo(false);
  };

  return (
    <Container className="freedom-wall-container">
      <div className="header">
        <h2 className="title">Freedom Wall</h2>
        <p className="description">
          Express yourself freely, share your thoughts, struggles, victories, or uplifting messages with our community.
        </p>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* New Post Input */}
      <Card className="post-input-card" onClick={() => setShowPostModal(true)}>
        <div className="post-input">
          <div className="avatar">A</div>
          <Form.Control type="text" placeholder="What's on your mind?" className="post-input-field" readOnly />
        </div>
      </Card>

      {/* Floating Post Modal with updated background */}
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#e6f4ea" }}>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f7fff9" }}>
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
            {selectedImage && (
              <div className="image-preview">
                <img src={selectedImage} alt="Selected" className="img-fluid" />
              </div>
            )}
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
                  <Smile
                    size={20}
                    className="post-icon"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                </div>
              </Button>
            </div>
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#e6f4ea" }}>
          <Button variant="success" onClick={handlePost}>Post</Button>
        </Modal.Footer>
      </Modal>

      {/* Floating Report Modal */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} centered className="report-modal">
        <Modal.Header closeButton style={{ backgroundColor: "#e6f4ea" }}>
          <Modal.Title>Report Post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f7fff9" }}>
          <p>Please select a reason for reporting this post:</p>
          {reportReasons.map((reason) => (
            <Form.Check
              key={reason}
              type="radio"
              id={`report-${reason}`}
              label={reason}
              name="reportReason"
              value={reason}
              checked={selectedReason === reason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="mb-2"
            />
          ))}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#e6f4ea" }}>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>Cancel</Button>
          <Button variant="success" onClick={submitReport} disabled={!selectedReason}>Submit</Button>
        </Modal.Footer>
      </Modal>

      {/* Undo Notification */}
      {showUndo && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#e6f4ea",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          Post hidden.{" "}
          <span
            style={{ color: "green", cursor: "pointer", fontWeight: "bold" }}
            onClick={undoHide}
          >
            Undo
          </span>
        </div>
      )}

      {/* Displaying Posts */}
      <div className="post-list">
        {posts.map((post) => (
          <Card className="post-card position-relative" key={post.id}>
            {/* Three-dot menu - only show for logged-in users */}
            {isLoggedIn && (
              <Dropdown className="position-absolute" style={{ top: "10px", right: "10px" }}>
                <Dropdown.Toggle
                  variant="light"
                  size="sm"
                  className="p-0 border-0 d-flex align-items-center justify-content-center"
                  bsPrefix="btn"
                  id={`dropdown-${post.id}`}
                >
                  <FaEllipsisV />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => openReportModal(post.id)}>Report</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleHide(post.id)}>Hide</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Card.Body>
              <div className="post-header">
                <div className="avatar">A</div>
                <div>
                  <Card.Title className="post-author">{post.author}</Card.Title>
                  <Card.Subtitle className="post-date">{post.date}</Card.Subtitle>
                </div>
              </div>
              <Card.Text className={`post-content ${!isLoggedIn ? 'blurred-content' : ''}`}>
                {censorText(post.content)}
              </Card.Text>
              {post.image && (
                <div className={`post-image-container ${!isLoggedIn ? 'blurred-content' : ''}`}>
                  <img src={post.image} alt="Post" className="img-fluid post-image" />
                </div>
              )}
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
            
            {/* Blur overlay for guests */}
            {!isLoggedIn && (
              <div className="post-blur-overlay">
                <div className="blur-message">
                  <p>Log in to view and interact with posts</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default FreedomWall;

