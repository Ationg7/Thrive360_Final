import { Image } from "react-bootstrap";
import logo from "../assets/Images/logo.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending login request...");
      const requestData = {
        email,
        password
      };
      console.log("Sending data:", requestData);

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        alert("Login successful!");
        navigate("/Home");
      } else {
        console.log("Full error response:", data); // Add this line
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join('\n');
          alert("Validation errors:\n" + errorMessages);
        } else {
          alert("Error: " + (data.message || data.error || "Server error occurred"));
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="container">
      {/* Login Form & Hero Image */}
      <div className="Login-form">
        {/* Login Form */}
        <div className="login-card">
          <div className="logo-container">
            <Image src={logo} alt="Logo" className="form-logo" />
          </div>
          <h1 className="title">Thrive360</h1>
          <h2 className="subtitle">Sign in</h2>

          <form className="form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <a href="/ForgotPassword " className="forgot-password">
              Forgot Password?
            </a>

            <button className="sign-in-btn" type="submit">
              Sign in
            </button>
          </form>

          <p className="signup-text">
            {" Don't have an account?"}{" "}
            <a href="/SignUp" className="signup-link">
              Sign up
            </a>
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="text-centers">
          <div className="circle-borders"></div>
          <div className="circle-backg"></div>
          <img
            src="https://www.groupiso.com/wp-content/uploads/2023/02/woman-laughing-on-phone.png"
            className="img-hero"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;