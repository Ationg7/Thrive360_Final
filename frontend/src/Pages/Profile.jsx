import { useState } from "react";
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
import { Heart, Send, Bell, CheckCircle } from "lucide-react";
import { BsFilter, BsGear, BsEmojiSmile } from "react-icons/bs";
import { ThreeDotsVertical, Image } from "react-bootstrap-icons";
import EmojiPicker from "emoji-picker-react";

const Profile = () => {
  // States
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Anonymous",
      date: "March 3, 2025",
      content: "Been tired and drained lately.",
      likes: 5,
      shares: 7,
      liked: false,
      shared: false,
      image: null,
    },
    {
      id: 2,
      author: "Anonymous",
      date: "March 23, 2025",
      content: "Feeling unwanted.",
      likes: 5,
      shares: 7,
      liked: false,
      shared: false,
      image: null,
    },
  ]);

  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handlers
  const handlePost = () => {
    if (!newPost.trim()) return;
    const newId = posts.length ? posts[0].id + 1 : 1;
    const newPostObj = {
      id: newId,
      author: "Anonymous",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      content: newPost,
      image: selectedImage,
      likes: 0,
      shares: 0,
      liked: false,
      shared: false,
    };
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setSelectedImage(null);
    setShowEmojiPicker(false);
    setShowPostModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
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

  return (
    <Container fluid className="profile-container">
      <Row className="gx-3">
        <Col xs={12}>
          <Card className="profile-header position-relative">
            <Card.Img variant="top" src="../public/images/k.jpg" className="profile-cover" />
            <Dropdown className="position-absolute" style={{ bottom: "10px", right: "10px" }} align="end">
              <Dropdown drop="down">
                <Dropdown.Toggle variant="light" className="three-dots-btn" bsPrefix="no-arrow-toggle">
                  <ThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Themes</Dropdown.Item>
                  <Dropdown.Item href="#">To-Do List</Dropdown.Item>
                  <Dropdown.Item href="#">Notifications</Dropdown.Item>
                  <Dropdown.Item href="#">History</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown>
            <Card.Body>
              <div className="profile-info">
                <div className="profile-picture">F <span className="profile-add">+</span></div>
                <div className="follow-info">
                  <h4>20 Followers • 10 Following</h4>
                </div>
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
        <ListGroup.Item className="event-item">
          <img src="https://i.pinimg.com/474x/28/48/90/284890478ce284e141c993bbd0339e8c.jpg" alt="Yoga Session" />
          <h6>Join Yoga Session</h6>
          <p>Overcome stress and communicate with people.</p>
        </ListGroup.Item>
        <ListGroup.Item className="event-item">
          <img src="https://i.pinimg.com/736x/d7/ea/93/d7ea9311f847f6d3014b0f8431fce2e2.jpg" alt="Self-Care" />
          <h6>Build a Self-Care Routine</h6>
          <p>A self-care guide for everyone.</p>
        </ListGroup.Item>
        <ListGroup.Item className="event-item">
          <img src="https://i.pinimg.com/736x/d7/ea/93/d7ea9311f847f6d3014b0f8431fce2e2.jpg" alt="Self-Care 2" />
          <h6>More Self-Care</h6>
          <p>Consistency is the key to mental clarity.</p>
        </ListGroup.Item>
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
              <div className="avatar me-3">A</div>
              <Form.Control
                type="text"
                placeholder="What's on your mind?"
                readOnly
                style={{ cursor: "pointer" }}
              />
            </div>


          </Card>

          
           <Card.Header className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Button variant="light" className="filter-btn">
                <BsFilter /> Filters
              </Button>
              <Button variant="light" className="ms-2 manage-posts-btn">
                <BsGear /> Manage posts
              </Button>
            </div>
          </Card.Header>
       
       
          <Modal show={showPostModal} onHide={() => setShowPostModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="post-modal-content">
                <div className="post-header d-flex align-items-center mb-3">
                  <div className="avatar me-2">A</div>
                  <span className="author-name">Anonymous</span>
                </div>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                {selectedImage && (
                  <div className="image-preview mt-3 text-center">
                    <img src={selectedImage} alt="Selected" className="img-fluid" style={{ maxHeight: "200px" }} />
                  </div>
                )}

                <div className="add-post-container mt-3 d-flex align-items-center">
                  <Button variant="light" className="add-post-btn d-flex align-items-center">
                    Add to your post
                    <div className="add-post-icons ms-2 d-flex gap-2 align-items-center">
                      <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                        <Image size={20} className="post-icon" />
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      <BsEmojiSmile
                        size={20}
                        className="post-icon"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      />
                    </div>
                  </Button>
                </div>

                {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handlePost} disabled={!newPost.trim()}>
                Post
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Posts list */}
          {posts.map((post) => (
            <Card key={post.id} className="post-card mb-3">
              <Card.Body>
                <div className="post-header d-flex align-items-center mb-2">
                  <div className="avatar me-2">A</div>
                  <div>
                    <Card.Title className="post-author mb-0">{post.author}</Card.Title>
                    <Card.Subtitle className="post-date text-muted">{post.date}</Card.Subtitle>
                  </div>
                </div>
                <Card.Text className="post-content">{post.content}</Card.Text>
                {post.image && (
                  <img
                    src={post.image}
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
          <Card className="mb-3 right-sidebar-card">
            <Card.Header>Notifications</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="notification-item">
                <Bell className="me-2" /> Welcome to Thrive360!
              </ListGroup.Item>
              <ListGroup.Item className="notification-item">
                <CheckCircle className="me-2 text-success" />
                <strong>Yoga session</strong> request accepted.
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card className="right-sidebar-card">
            <Card.Header>To Do List</Card.Header>
            <ListGroup variant="flush">
              {[
                "Do Meditation",
                "Attend Yoga Session",
                "Study for Exams",
                "Complete Project",
                "Relax and Unwind",
                "Plan Weekend Activities",
                "Check Emails",
                 
              ].map((task, idx) => (
                <ListGroup.Item
                  key={idx}
                  className="d-flex justify-content-between align-items-center recent-activity-item"
                >
                  <span>{task}</span>
                  <Form.Check type="checkbox" className="mb-0 green-checkbox" />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
