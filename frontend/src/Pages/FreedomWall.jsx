import React, { useState, useEffect } from "react";
import { Container, Card, Form, Modal, Button, Dropdown } from "react-bootstrap";
import { Heart, Send, Image, Smile } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import "../App.css";

const FreedomWall = () => {
  const { isLoggedIn } = useAuth();
  
  const initialPosts = [
    {
      id: 1,
      author: "Anonymous",
      date: "March 21 at 6:59 PM",
      content:
        "I was doing fine, but you just came and ruined my peace of mind. PLS.. let me go back to the time when I completely didn't have any idea you exist. It is hard to sleep when there's so much on your mind.",
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

  const [posts, setPosts] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [showUndo, setShowUndo] = useState(false);

  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportPostId, setReportPostId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedReasonCustom, setSelectedReasonCustom] = useState("");

  const reportReasons = [
    { value: "spam", label: "Spam or misleading" },
    { value: "harassment", label: "Harassment or bullying" },
    { value: "hate_speech", label: "Hate speech or violence" },
    { value: "nudity", label: "Nudity or sexual content" },
    { value: "self_harm", label: "Self-harm or dangerous acts" },
    { value: "other", label: "Other" },
  ];

  const badWords = ["badword1", "badword2", "badword3"];
  const censorText = (text) => {
    let censored = text;
    badWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      censored = censored.replace(regex, "*".repeat(word.length));
    });
    return censored;
  };

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/freedom-wall/posts');
        if (!res.ok) throw new Error('Failed to load posts');
        const data = await res.json();
        const normalized = (Array.isArray(data) ? data : []).map(p => ({
          id: p.id,
          author: p.author || 'Anonymous',
          date: new Date(p.created_at).toLocaleString(),
          content: p.content,
          likes: p.likes || 0,
          shares: p.shares || 0,
          liked: false,
          shared: false,
          image: p.image_path ? (`http://127.0.0.1:8000/storage/${p.image_path}`) : null
        }));
        setPosts(normalized);
      } catch (e) {
        console.error('Error fetching posts:', e);
        setPosts(initialPosts);
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (newPost.trim() === "" && !selectedImage) return;
    try {
      const formData = new FormData();
      formData.append('content', newPost);
      if (selectedImage instanceof File) {
        formData.append('image', selectedImage);
      }
      const res = await fetch('http://127.0.0.1:8000/api/freedom-wall/posts', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Failed to post');
      const p = await res.json();
      const entry = {
        id: p.id,
        author: p.author || 'Anonymous',
        date: new Date(p.created_at).toLocaleString(),
        content: p.content,
        likes: p.likes || 0,
        shares: p.shares || 0,
        liked: false,
        shared: false,
        image: p.image_path ? (`http://127.0.0.1:8000/storage/${p.image_path}`) : null
      };
      setPosts([entry, ...posts]);
      setNewPost("");
      setSelectedImage(null);
      setShowPostModal(false);
    } catch (e) {
      console.error('Error creating post:', e);
      alert('Failed to create post. Please try again.');
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewPost((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const openReportModal = (id) => {
    setReportPostId(id);
    setShowReportModal(true);
  };

  const submitReport = async () => {
    if (!selectedReason) {
      alert('Please select a reason for reporting this post.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/freedom-wall/posts/${reportPostId}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: selectedReason,
          custom_reason: selectedReason === 'other' ? selectedReasonCustom : null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setShowReportModal(false);
        setReportPostId(null);
        setSelectedReason('');
        setSelectedReasonCustom('');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred while submitting the report. Please try again.');
    }
  };

  const oldSubmitReport = (reason) => {
    console.log(`Post ${reportPostId} reported for reason: ${reason}`);
    setShowReportModal(false);
    setSelectedReason("");
    setSelectedReasonCustom("");
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

      {/* Post Input - Available for both logged in and guest users */}
      <Card className="post-input-card" onClick={() => setShowPostModal(true)} style={{ cursor: 'pointer' }}>
        <div className="post-input d-flex align-items-center">
          <div className="avatar me-3" style={{ 
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
          }}>
            A
          </div>
          <Form.Control 
            type="text" 
            placeholder={isLoggedIn ? "What's on your mind? Share your thoughts..." : "Express yourself anonymously... Share your feelings freely"} 
            className="post-input-field" 
            readOnly 
            style={{
              backgroundColor: '#f8f9fa',
              border: 'none',
              fontSize: '1rem',
              color: '#6c757d'
            }}
          />
          {!isLoggedIn && (
            <small className="text-muted ms-2" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
              Anonymous posting
            </small>
          )}
        </div>
      </Card>

      {/* Guest user info banner */}
      {!isLoggedIn && (
        <div className="alert alert-info mb-4" style={{ 
          maxWidth: '1000px', 
          width: '100%',
          borderRadius: '12px',
          border: '1px solid #bee5eb',
          backgroundColor: '#d1ecf1'
        }}>
          <div className="d-flex align-items-center">
            <span className="me-2">ℹ️</span>
            <div className="flex-grow-1">
              <strong>Anonymous Posting:</strong> You can share your thoughts freely. 
              <Link to="/signin" className="ms-2 text-decoration-none fw-bold">Sign in</Link> to view community posts and interact with others.
            </div>
          </div>
        </div>
      )}

      {/* Floating Post Modal */}
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#e6f4ea" }}>
          <Modal.Title>
            {isLoggedIn ? "Create Post" : "Share Anonymously"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f7fff9" }}>
          {/* Guest user notice */}
          {!isLoggedIn && (
            <div className="alert alert-warning mb-3" style={{ 
              borderRadius: '8px',
              backgroundColor: '#fff3cd',
              borderColor: '#ffeaa7',
              fontSize: '0.9rem'
            }}>
              <div className="d-flex align-items-center">
                <span className="me-2">🔒</span>
                <div>
                  <strong>Anonymous Mode:</strong> Your post will be shared anonymously. 
                  <Link to="/signin" className="ms-1 text-decoration-none">Sign in</Link> to interact with the community.
                </div>
              </div>
            </div>
          )}
          
          <div className="post-modal-content">
            {/* Modal Header */}
            <div className="post-header d-flex align-items-center mb-2">
              <div className="avatar me-2" style={{ 
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
              }}>
                A
              </div>
              <div className="author-info d-flex flex-column">
                <Card.Title className="post-author mb-0">Anonymous</Card.Title>
                <Card.Subtitle className="post-date">{new Date().toLocaleString()}</Card.Subtitle>
              </div>
            </div>

            {/* Textarea */}
            <Form.Control
              as="textarea"
              rows={4}
              placeholder={isLoggedIn 
                ? "What's on your mind? Share your thoughts with the community..." 
                : "Express yourself freely... Share your feelings, thoughts, or experiences anonymously. Your voice matters."
              }
              className="post-textarea mb-2"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              style={{
                fontSize: '1rem',
                lineHeight: '1.5',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '12px'
              }}
            />

            {/* Preview selected image */}
            {selectedImage && (
              <div className="image-preview mb-2">
                <img src={selectedImage} alt="Selected" className="img-fluid" />
              </div>
            )}

            {/* Add Image/Emoji */}
            <div className="add-post-container">
              <Button variant="light" className="add-post-btn">
                Add to your post
                <div className="add-post-icons ms-2">
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
                    className="post-icon ms-2"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                </div>
              </Button>
            </div>

            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#e6f4ea" }}>
          <Button 
            variant="success" 
            onClick={handlePost}
            style={{
              padding: '10px 20px',
              fontWeight: '600',
              borderRadius: '8px'
            }}
          >
            {isLoggedIn ? "Post" : "Share Anonymously"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Report Modal */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} centered className="report-modal">
        <Modal.Header closeButton style={{ backgroundColor: "#e6f4ea" }}>
          <Modal.Title>Report Post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f7fff9" }}>
          <p>Please select a reason for reporting this post:</p>
          {reportReasons.map((reason) => (
            <Form.Check
              key={reason.value}
              type="radio"
              id={`report-${reason.value}`}
              label={reason.label}
              name="reportReason"
              value={reason.value}
              checked={selectedReason === reason.value}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="mb-2"
            />
          ))}
          {selectedReason === "other" && (
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your reason..."
              className="mt-2"
              value={selectedReasonCustom || ""}
              onChange={(e) => setSelectedReasonCustom(e.target.value)}
            />
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#e6f4ea" }}>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>Cancel</Button>
          <Button
            variant="success"
            onClick={submitReport}
            disabled={selectedReason === "" || (selectedReason === "other" && !selectedReasonCustom)}
          >
            Submit
          </Button>
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

      {/* Posts List */}
      <div className="post-list">
        {posts.map((post) => (
          <Card className={`post-card position-relative mb-3 ${!isLoggedIn ? 'blurred-content' : ''}`} key={post.id}>
            {/* Blur overlay for guest users */}
            {!isLoggedIn && (
              <div className="post-blur-overlay">
                <div className="blur-message">
                  <p>🔒 Join to view community posts</p>
                  <small className="text-muted mb-3 d-block">
                    Connect with others and see their shared experiences
                  </small>
                  <div className="mt-2">
                    <Link to="/signin" className="btn btn-success btn-sm me-2">Sign In</Link>
                    <Link to="/signup" className="btn btn-outline-success btn-sm">Sign Up</Link>
                  </div>
                </div>
              </div>
            )}

            {/* Three-dot menu - only show for logged in users */}
            {isLoggedIn && (
              <Dropdown className="position-absolute" style={{ top: "15px", right: "15px", zIndex: 5 }}>
                <Dropdown.Toggle
                  variant="light"
                  size="sm"
                  className="p-1 border-0 d-flex align-items-center justify-content-center shadow-sm"
                  bsPrefix="btn"
                  id={`dropdown-${post.id}`}
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <FaEllipsisV size={14} color="#666" />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="shadow-sm">
                  <Dropdown.Item onClick={() => openReportModal(post.id)} className="text-warning">
                    ⚠️ Report Post
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleHide(post.id)} className="text-muted">
                    👁️ Hide Post
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Card.Body className="p-4">
              {/* Post Header with improved styling */}
              <div className="post-header d-flex align-items-start mb-3">
                <div className="avatar me-3" style={{ 
                  background: 'linear-gradient(135deg, #28a745, #20c997)',
                  boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                }}>
                  A
                </div>
                <div className="author-info flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title className="post-author mb-1" style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: '600', 
                        color: '#2c3e50' 
                      }}>
                        {post.author}
                      </Card.Title>
                      <Card.Subtitle className="post-date" style={{ 
                        fontSize: '0.85rem', 
                        color: '#6c757d',
                        fontWeight: '400'
                      }}>
                        📅 {post.date}
                      </Card.Subtitle>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <Card.Text className="post-content mb-3" style={{ 
                fontSize: '1rem', 
                lineHeight: '1.6', 
                color: '#2c3e50',
                marginLeft: '53px' // Align with author info
              }}>
                {censorText(post.content)}
              </Card.Text>

              {/* Post Image */}
              {post.image && (
                <div className="post-image-container mb-3" style={{ marginLeft: '53px' }}>
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="img-fluid post-image" 
                    style={{ 
                      borderRadius: '12px',
                      maxHeight: '400px',
                      objectFit: 'cover',
                      width: '100%',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="post-actions d-flex gap-4 pt-2 border-top" style={{ 
                marginLeft: '53px',
                borderColor: '#e9ecef !important'
              }}>
                <div 
                  className={`like-button d-flex align-items-center ${isLoggedIn ? 'cursor-pointer' : ''}`} 
                  onClick={isLoggedIn ? () => handleLike(post.id) : undefined}
                  style={{ 
                    padding: '8px 12px',
                    borderRadius: '20px',
                    transition: 'all 0.2s ease',
                    backgroundColor: post.liked ? 'rgba(220, 53, 69, 0.1)' : 'transparent',
                    cursor: isLoggedIn ? 'pointer' : 'default',
                    opacity: isLoggedIn ? 1 : 0.6
                  }}
                  onMouseEnter={(e) => {
                    if (isLoggedIn) e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    if (isLoggedIn && !post.liked) e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <Heart 
                    color={post.liked ? "#dc3545" : "#6c757d"} 
                    fill={post.liked ? "#dc3545" : "none"} 
                    size={20} 
                    className="me-2" 
                  />
                  <span style={{ 
                    fontWeight: '500', 
                    color: post.liked ? '#dc3545' : '#6c757d',
                    fontSize: '0.9rem'
                  }}>
                    {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                  </span>
                </div>

                <div 
                  className={`share-button d-flex align-items-center ${isLoggedIn ? 'cursor-pointer' : ''}`} 
                  onClick={isLoggedIn ? () => handleShare(post.id) : undefined}
                  style={{ 
                    padding: '8px 12px',
                    borderRadius: '20px',
                    transition: 'all 0.2s ease',
                    backgroundColor: post.shared ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                    cursor: isLoggedIn ? 'pointer' : 'default',
                    opacity: isLoggedIn ? 1 : 0.6
                  }}
                  onMouseEnter={(e) => {
                    if (isLoggedIn) e.target.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    if (isLoggedIn && !post.shared) e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <Send 
                    color={post.shared ? "#007bff" : "#6c757d"} 
                    fill={post.shared ? "#007bff" : "none"} 
                    size={20} 
                    className="me-2" 
                  />
                  <span style={{ 
                    fontWeight: '500', 
                    color: post.shared ? '#007bff' : '#6c757d',
                    fontSize: '0.9rem'
                  }}>
                    {post.shares} {post.shares === 1 ? 'Share' : 'Shares'}
                  </span>
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
