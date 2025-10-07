import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Dropdown,
  Form,
  Modal,
} from "react-bootstrap";
import { Heart, Send, CheckCircle, Smile } from "lucide-react";
import { BsFilter, BsGear } from "react-icons/bs";
import { ThreeDotsVertical, Image } from "react-bootstrap-icons";
import EmojiPicker from "emoji-picker-react";
import TodoList from "../Components/TodoList";
import Notifications from "../Components/Notifications";
import Avatar from "../Components/Avatar";
import {useAuth} from "../AuthContext";

const Profile = () => {
   const { isLoggedIn, user } = useAuth();


  // Posts States
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postFilter, setPostFilter] = useState("all");

  // Events States
  const [events, setEvents] = useState([]);

  // Profile Photo Modal State
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Guest popup state
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  // Helper
   const getUserEmail = () => {
    if (user?.email) return user.email;
    try {
      const stored = localStorage.getItem("user");
      if (stored) return JSON.parse(stored)?.email || "";
    } catch {
      // Ignore JSON parse errors
    }
    return localStorage.getItem("userEmail") || "";
  };



  // Post Handlers
   const handlePost = async () => {
    if (!newPost.trim() && !selectedImage) return;
    try {
      const formData = new FormData();
      formData.append("content", newPost);
      if (selectedImage instanceof File) formData.append("image", selectedImage);

      const res = await fetch("http://127.0.0.1:8000/api/freedom-wall/posts", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to post");
      const p = await res.json();
      const entry = {
        id: p.id,
        author: p.author || (user?.name || "You"),
        email: user?.email || getUserEmail(),
        date: p.created_at
          ? new Date(p.created_at).toLocaleString()
          : new Date().toLocaleString(),
        content: p.content,
        likes: p.likes || 0,
        shares: 0,
        liked: false,
        shared: false,
        image: p.image_path ? `http://127.0.0.1:8000/storage/${p.image_path}` : null,
      };
      setPosts((prev) => [entry, ...prev]);
      setNewPost("");
      setSelectedImage(null);
      setShowEmojiPicker(false);
      setShowPostModal(false);
    } catch (e) {
      console.error("Error creating post:", e);
      alert("Failed to create post. Please try again.");
    }

  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    setNewPost((prev) => prev + emojiObject.emoji);
  };

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleShare = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              shared: !post.shared,
              shares: post.shared ? post.shares - 1 : post.shares + 1,
            }
          : post
      )
    );
  };

  // Load posts based on filter
  const loadPosts = async (filter) => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let response;
      switch (filter) {
        case "saved":
          response = await fetch(
            "http://127.0.0.1:8000/api/freedom-wall/saved-posts",
            { headers }
          );
          if (response.ok) {
            const data = await response.json();
           const normalizedPosts = (Array.isArray(data) ? data : []).map((post) => ({
              ...post,
              email: post.email || post.user?.email || null,
              author: post.author || post.user?.name || "Anonymous",
            }));
            setPosts(normalizedPosts);


          }
          break;
         case "my":
          response = await fetch(
            "http://127.0.0.1:8000/api/freedom-wall/my-posts",
            { headers }
          );
          if (response.ok) {
            const data = await response.json();
            const normalizedPosts = (Array.isArray(data) ? data : []).map((post) => ({
              ...post,
              email: post.email || post.user?.email || null,
              author: post.author || post.user?.name || "Anonymous",
            }));
            setPosts(normalizedPosts);
          }
          break;


        default:
          response = await fetch("http://127.0.0.1:8000/api/freedom-wall/posts");
          if (response.ok) {
            const data = await response.json();
           const normalizedPosts = (Array.isArray(data) ? data : []).map((post) => ({
              ...post,
              email: post.email || post.user?.email || null,
              author: post.author || post.user?.name || "Anonymous",
            }));
            setPosts(normalizedPosts);
          }
          break;
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  // Load events
  const loadEvents = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch("http://127.0.0.1:8000/api/events", {
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events:", response.status);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Load posts when filter changes
  useEffect(() => {
    loadPosts(postFilter);
  }, [postFilter]);
 // Store user email in localStorage when user changes
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem("userEmail", user.email);
    }
  }, [user]);


  // Load events once on mount
  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Container fluid className="profile-container">
      <Row className="gx-3">
        <Col xs={12}>
          <Card className="profile-header position-relative">
            <Card.Img
              variant="top"
              src="../public/images/k.jpg"
              className="profile-cover"
            />
            <Dropdown
              className="position-absolute"
              style={{ bottom: "10px", right: "10px" }}
              align="end"
            >
              <Dropdown.Toggle
                variant="light"
                className="three-dots-btn"
                bsPrefix="no-arrow-toggle"
              >
                <ThreeDotsVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowPhotoModal(true)}>
                  Change Photo
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Modal
              show={showPhotoModal}
              onHide={() => setShowPhotoModal(false)}
              centered
              className="photo-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Change Photo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="g-2">
                  <Col xs={4}>
                    <img
                      src="/images/photo1.jpg"
                      alt="Photo 1"
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col xs={4}>
                    <img
                      src="/images/photo2.jpg"
                      alt="Photo 2"
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col xs={4}>
                    <img
                      src="/images/photo3.jpg"
                      alt="Photo 3"
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col xs={4}>
                    <img
                      src="/images/photo4.jpg"
                      alt="Photo 4"
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col xs={4}>
                    <img
                      src="/images/photo5.jpg"
                      alt="Photo 5"
                      className="img-fluid rounded"
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowPhotoModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Card.Body>
              <div className="profile-info">
                 <Avatar email={getUserEmail()} size={60} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Left Side */}
        <Col md={3} className="events-container">
          <Card className="mb-3 events-card">
            <Card.Header>Events</Card.Header>
            <div className="events-scroll-wrapper">
              <ListGroup variant="flush">
                {events.map((event) => (
                  <ListGroup.Item key={event.id} className="event-item">
                    {event.image && <img src={event.image} alt={event.title} />}
                    <h6>{event.title}</h6>
                    <p>{event.description}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card>

          <Card className="mb-3 events-card">
            <Card.Header>Challenges You've Joined</Card.Header>
            <hr className="my-0" />
            <div className="events-scroll-wrapper">
              <ListGroup variant="flush">
                 {(() => {
                  const joinedChallenges = JSON.parse(localStorage.getItem('joinedChallenges') || '[]');
                  const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
                 
                  if (joinedChallenges.length === 0 && completedChallenges.length === 0) {
                    return (
                      <ListGroup.Item className="event-item text-center text-muted">
                        <h6>No Joined Challenges. Join Now</h6>
                      </ListGroup.Item>
                    );
                  }
                 
                  return (
                    <>
                      {joinedChallenges.map((challenge, index) => (
                        <ListGroup.Item key={`joined-${index}`} className="event-item">
                          <h6>{challenge.title}</h6>
                          <small className="text-success">In Progress</small>
                        </ListGroup.Item>
                      ))}
                      {completedChallenges.map((challenge, index) => (
                        <ListGroup.Item key={`completed-${index}`} className="event-item">
                          <h6>{challenge.title}</h6>
                          <small className="text-muted">Completed</small>
                        </ListGroup.Item>
                      ))}
                    </>
                  );
                })()}


              </ListGroup>
            </div>
          </Card>
        </Col>

        {/* What's on your mind? */}
        <Col md={6} className="what-form">
          <Card
            className="post-input-card mb-3 mt-3"
            onClick={() => setShowPostModal(true)}
            style={{ cursor: "pointer" }}
          >
            <div className="post-input d-flex align-items-center p-2">
              <div className="me-3">
                <Avatar email={getUserEmail()} size={40} />
              </div>

              <Form.Control
                type="text"
                placeholder="What's on your mind?"
                readOnly
                style={{ cursor: "pointer" }}
              />
            </div>
          </Card>

          {/* Filters and Manage Posts */}
          <Card.Header className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Dropdown className="d-inline me-2">
                <Dropdown.Toggle variant="light" className="filter-btn">
                  <BsFilter /> Filters
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setPostFilter("date")}>
                    By Date
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setPostFilter("likes")}>
                    Most Liked
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setPostFilter("hearts")}>
                    Most Hearted
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setPostFilter("images")}>
                    With Images
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="d-inline ms-2">
                <Dropdown.Toggle
                  variant="light"
                  className="manage-posts-btn"
                  id="manage-posts-dropdown"
                >
                  <BsGear /> Manage posts
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setPostFilter("my")}>
                    My Posts
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setPostFilter("saved")}>
                    Saved Posts
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>

          {/* Post Modal */}
          <Modal
            show={showPostModal}
            onHide={() => setShowPostModal(false)}
            centered
          >
            <Modal.Header closeButton style={{ backgroundColor: "#e6f4ea" }}>
              <Modal.Title>
                {isLoggedIn ? "Create Post" : "Share Anonymously"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#f7fff9" }}>
              <div className="post-header d-flex align-items-center mb-1">
                <Avatar email={getUserEmail()} size={45} />
                <div className="author-info ms-2">
                  <span className="post-author">
                    {isLoggedIn ? (user?.name || "You") : "Anonymous"}
                  </span>
                  <span className="post-date">{new Date().toLocaleString()}</span>
                </div>
              </div>

              <Form.Control
                as="textarea"
                rows={3}
                placeholder={
                  isLoggedIn
                    ? "What's on your mind?"
                    : "Express yourself freely..."
                }
                className="post-textarea"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />

              {selectedImage && (
                <div className="mt-2">
                  <img
                    src={
                      selectedImage instanceof File
                        ? URL.createObjectURL(selectedImage)
                        : selectedImage
                    }
                    alt="Selected"
                    className="img-fluid post-image-preview"
                  />
                </div>
              )}

              <div
                className="add-post-container mt-2 d-flex align-items-center"
                style={{
                  border: "1px solid green",
                  borderRadius: "8px",
                  padding: "6px",
                  gap: "10px",
                }}
              >
                <label
                  htmlFor="image-upload"
                  style={{ cursor: "pointer" }}
                  title="Add image"
                >
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
                  onClick={() => setShowEmojiPicker((s) => !s)}
                  style={{ cursor: "pointer" }}
                />
              </div>

              {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#e6f4ea" }}>
              <Button variant="secondary" onClick={() => setShowPostModal(false)}>
                Cancel
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  if (isLoggedIn) {
                    handlePost();
                  } else {
                    setShowGuestPopup(true);
                    setShowPostModal(false);
                  }
                }}
              >
                {isLoggedIn ? "Post" : "Share Anonymously"}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Posts list */}
          {posts.map((post) => (
            <Card key={post.id} className="post-card mb-3">
              <Card.Body>
                <div className="post-header d-flex align-items-center mb-2">
                  <div className="me-2">
                    <Avatar email={getUserEmail()} size={45} />
                  </div>

                  <div>
                    <Card.Title className="post-author mb-0">{post.author}</Card.Title>
                    <Card.Subtitle className="post-date text-muted">
                      {post.date}
                    </Card.Subtitle>
                  </div>
                </div>
                <Card.Text className="post-content">{post.content}</Card.Text>
                {post.image && (
                  <img
                    src={
                      post.image instanceof File
                        ? URL.createObjectURL(post.image)
                        : post.image
                    }
                    alt="Post"
                    className="img-fluid post-image mb-2"
                    style={{ maxHeight: "300px" }}
                  />
                )}
                <div className="post-actions d-flex gap-3">
                  <div
                    className="like-button d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart
                      color={post.liked ? "red" : "black"}
                      fill={post.liked ? "red" : "none"}
                      size={18}
                      className="me-1"
                    />
                    <small>{post.likes}</small>
                  </div>
                  <div
                    className="share-button d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShare(post.id)}
                  >
                    <Send
                      color={post.shared ? "blue" : "black"}
                      fill={post.shared ? "blue" : "none"}
                      size={18}
                      className="me-1"
                    />
                    <small>{post.shares}</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Right Sidebar */}
        <Col md={3} className="right-sidebar">
          <Notifications />
          <TodoList />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
