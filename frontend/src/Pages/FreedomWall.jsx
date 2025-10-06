import React, { useState, useEffect } from "react";
import { Container, Card, Form, Modal, Button, Dropdown } from "react-bootstrap";
import { Heart, Bookmark, Image, Smile, ThumbsUp } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import "../App.css";

const FreedomWall = () => {
  const { isLoggedIn, user } = useAuth();

  const initialPosts = [
    {
      id: 1,
      author: "Anonymous",
      date: "March 21 at 6:59 PM",
      content: "I was doing fine, but you just came and ruined my peace of mind...",
      likes: 34,
      hearts: 5,
      saves: 10,
      liked: false,
      hearted: false,
      saved: false,
      image: null,
    },
    {
      id: 2,
      author: "Anonymous",
      date: "March 21 at 6:59 PM",
      content: '"How is your life?" Ito unti-unting nilulunod ng kalungkutan...',
      likes: 120,
      hearts: 12,
      saves: 25,
      liked: false,
      hearted: false,
      saved: false,
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
    if (!text) return "";
    let censored = text;
    badWords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      censored = censored.replace(regex, "*".repeat(word.length));
    });
    return censored;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/freedom-wall/posts");
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();
        const normalized = (Array.isArray(data) ? data : []).map((p) => ({
          id: p.id,
          author: p.author || "Anonymous",
          date: p.created_at
            ? new Date(p.created_at).toLocaleString()
            : new Date().toLocaleString(),
          content: p.content,
          likes: p.likes || 0,
          hearts: p.hearts || 0,
          saves: p.saves || 0,
          liked: false,
          hearted: false,
          saved: false,
          image: p.image_path
            ? `http://127.0.0.1:8000/storage/${p.image_path}`
            : null,
        }));
        setPosts(normalized);
      } catch (e) {
        console.error("Error fetching posts:", e);
        setPosts(initialPosts);
      }
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const handleReaction = async (postId, reactionType) => {
  if (!isLoggedIn) return;

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/freedom-wall/posts/${postId}/react`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`, // must have a valid token
        },
        body: JSON.stringify({ reaction_type: reactionType }),
      }
    );

    if (!res.ok) {
  const errorData = await res.json().catch(() => ({}));
  console.error("Reaction API error:", JSON.stringify(errorData, null, 2)); // 👈 pretty print
  alert(errorData.message || "Failed to react");
  return;
}


    const data = await res.json();

    // Update local post state
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: data.likes ?? post.likes,
              hearts: data.hearts ?? post.hearts,
              liked: data.user_reaction === "like",
              hearted: data.user_reaction === "heart",
            }
          : post
      )
    );
  } catch (err) {
    console.error("Reaction error:", err);
    alert("Could not reach the server. Make sure your backend is running.");
  }
};



  const handleSave = (id) => {
    if (!isLoggedIn) return;
    if (!window.confirm("Do you want to save this post?")) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              saves: post.saved ? post.saves - 1 : post.saves + 1,
              saved: !post.saved,
            }
          : post
      )
    );
  };

  const handlePost = async () => {
    if (newPost.trim() === "" && !selectedImage) return;
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
        author: p.author || "Anonymous",
        date: p.created_at
          ? new Date(p.created_at).toLocaleString()
          : new Date().toLocaleString(),
        content: p.content,
        likes: p.likes || 0,
        hearts: p.hearts || 0,
        saves: p.saves || 0,
        liked: false,
        hearted: false,
        saved: false,
        image: p.image_path
          ? `http://127.0.0.1:8000/storage/${p.image_path}`
          : null,
      };
      setPosts((prev) => [entry, ...prev]);
      setNewPost("");
      setSelectedImage(null);
      setShowPostModal(false);
    } catch (e) {
      console.error("Error creating post:", e);
      alert("Failed to create post. Please try again.");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewPost((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(file);
  };

  const openReportModal = (id) => {
    setReportPostId(id);
    setShowReportModal(true);
  };

  const submitReport = async () => {
    if (!selectedReason) {
      alert("Please select a reason for reporting this post.");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/freedom-wall/posts/${reportPostId}/report`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reason: selectedReason,
            custom_reason:
              selectedReason === "other" ? selectedReasonCustom : null,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Report submitted");
        setShowReportModal(false);
        setReportPostId(null);
        setSelectedReason("");
        setSelectedReasonCustom("");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to submit report.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  const handleHide = (id) => {
    const postToHide = posts.find((post) => post.id === id);
    if (postToHide) {
      setHiddenPosts((prev) => [postToHide, ...prev]);
      setPosts((prev) => prev.filter((post) => post.id !== id));
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 5000);
    }
  };

  const undoHide = () => {
    setPosts((prev) => [...hiddenPosts, ...prev]);
    setHiddenPosts([]);
    setShowUndo(false);
  };

  const getAvatarLetter = (name) =>
    name ? name.charAt(0).toUpperCase() : "A";

  return (
    <Container className="freedom-wall-container">
      <div className="header">
        <h2 className="title">Freedom Wall</h2>
        <p className="description">
          Express yourself freely, share your thoughts, struggles, victories, or
          uplifting messages with our community.
        </p>
      </div>

      {/* New Post Input */}
      <Card
        className="post-input-card"
        onClick={() => setShowPostModal(true)}
        style={{ cursor: "text" }}
      >
        <div className="post-header" style={{ alignItems: "center" }}>
          <div className="avatar">
            {isLoggedIn && user?.name ? getAvatarLetter(user.name) : "A"}
          </div>
          <Form.Control
            type="text"
            placeholder={
              isLoggedIn
                ? "What's on your mind?"
                : "Express yourself anonymously..."
            }
            className="post-input-field"
            readOnly
          />
        </div>
      </Card>

      {/* Guest Info */}
      {!isLoggedIn && (
        <div className="alert alert-info mt-3">
          Anonymous posting enabled. <Link to="/signin">Sign in</Link> to
          interact with others.
        </div>
      )}

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
          <div className="post-header" style={{ alignItems: "center" }}>
            <div className="avatar">
              {isLoggedIn && user?.name ? getAvatarLetter(user.name) : "A"}
            </div>
            <div className="author-info">
              <span className="post-author">
                {isLoggedIn ? user?.name || "You" : "Anonymous"}
              </span>
              <span className="post-date">{new Date().toLocaleString()}</span>
            </div>
          </div>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder={
              isLoggedIn ? "What's on your mind?" : "Express yourself freely..."
            }
            className="post-textarea"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />

          {selectedImage && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(selectedImage)}
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
          <Button variant="success" onClick={handlePost}>
            {isLoggedIn ? "Post" : "Share Anonymously"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Report Modal */}
      <Modal
        show={showReportModal}
        onHide={() => setShowReportModal(false)}
        centered
      >
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
              value={selectedReasonCustom}
              onChange={(e) => setSelectedReasonCustom(e.target.value)}
            />
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#e6f4ea" }}>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={submitReport}
            disabled={
              !selectedReason ||
              (selectedReason === "other" && !selectedReasonCustom)
            }
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Undo Snackbar */}
      {showUndo && (
        <div className="undo-toast show">
          Post hidden.{" "}
          <span
            onClick={undoHide}
            style={{ cursor: "pointer", color: "green", fontWeight: "600" }}
          >
            Undo
          </span>
        </div>
      )}

      {/* Posts */}
      <div className="post-list mt-3">
        {posts.map((post) => (
          <Card
            className={`post-card position-relative ${
              !isLoggedIn ? "blurred-content" : ""
            }`}
            key={post.id}
          >
            {!isLoggedIn && (
              <div className="post-blur-overlay">
                <p>🔒 Join to view posts</p>
                <Link to="/signin" className="btn btn-success btn-sm me-2">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-outline-success btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <Dropdown
                className="position-absolute"
                style={{ top: "10px", right: "10px" }}
              >
                <Dropdown.Toggle
                  variant="light"
                  size="sm"
                  className="p-0 border-0 no-caret"
                >
                  <FaEllipsisV />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => openReportModal(post.id)}>
                    Report
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleHide(post.id)}>
                    Hide
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Card.Body className="p-0">
              <div className="p-3">
                <div className="post-header">
                  <div className="avatar">{getAvatarLetter(post.author)}</div>
                  <div className="author-info">
                    <Card.Title className="post-author">{post.author}</Card.Title>
                    <Card.Subtitle className="post-date">{post.date}</Card.Subtitle>
                  </div>
                </div>

                <p className="post-content">{censorText(post.content)}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="img-fluid post-image"
                  />
                )}

                <div
                  className="post-actions d-flex align-items-center mt-3"
                  style={{ justifyContent: "flex-start" }}
                >
                  {/* Like */}
                  <div
                    className="d-flex align-items-center me-3 like-action"
                    onClick={isLoggedIn ? () => handleReaction(post.id, "like") : undefined}
                    style={{ cursor: isLoggedIn ? "pointer" : "default" }}
                  >
                    <ThumbsUp
                      size={18}
                      stroke={post.liked ? "blue" : "black"}
                      fill={post.liked ? "blue" : "none"}
                      className="me-1"
                    />
                    <small>{post.likes}</small>
                  </div>

                  {/* Heart */}
                  <div
                    className="d-flex align-items-center me-3 heart-action"
                    onClick={isLoggedIn ? () => handleReaction(post.id, "heart") : undefined}
                    style={{ cursor: isLoggedIn ? "pointer" : "default" }}
                  >
                    <Heart
                      size={18}
                      className="me-1"
                      fill={post.hearted ? "red" : "none"}
                      stroke={post.hearted ? "red" : "gray"}
                    />
                    <small>{post.hearts ?? 0}</small>
                  </div>

                  {/* Save */}
                  <div
                    className="d-flex align-items-center save-action"
                    onClick={isLoggedIn ? () => handleSave(post.id) : undefined}
                    style={{ cursor: isLoggedIn ? "pointer" : "default" }}
                  >
                    <Bookmark
                      size={18}
                      className="me-1"
                      fill={post.saved ? "green" : "none"}
                      stroke={post.saved ? "green" : "gray"}
                    />
                    <small>{post.saves}</small>
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
