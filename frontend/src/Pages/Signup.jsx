import logo from '../assets/Images/logo.png';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const requestData = {
        email,
        password,
        password_confirmation: confirmPassword
      };

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok) {
        // Use AuthContext to store token and user info
        login(data.token, data.user);
        alert("Registration successful!");
        navigate("/Home");
      } else {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join('\n');
          setError("Validation errors:\n" + errorMessages);
        } else {
          setError(data.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("Network error: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <div className="signup-card">
          {/* Logo & Title */}
          <div className="logo-containers">
            <h6 className="Signup-text">Sign up</h6>
            <img src={logo} alt="Logo" className="small-logo" />
          </div>

          <h2 className="titles">Create an account</h2>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="input-field"
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
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            {/* Register Button */}
            <button className="register-btn" type="submit">
              Register
            </button>
          </form>

          {error && <p className="text-danger mt-2">{error}</p>}

          <p className="signup-text">
            Already have an account?{" "}
            <a href="/SignIn" className="signup-link">
              Sign in
            </a>
          </p>
        </div>

        {/* Side image & circles */}
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

export default SignUp;
