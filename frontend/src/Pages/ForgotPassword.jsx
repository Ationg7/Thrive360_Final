import { Image } from "react-bootstrap";
import logo from "../assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
    <div className="forgot-container">
      <div className="forgot-wrapper">
        {/* Forgot Password Card */}
        <div className="forgot-card">
          <FaArrowLeft className="back-arrow" onClick={() => navigate(-1)} />
          <div className="logo-container">
            <Image src={logo} alt="Logo" className="form-logo" />
          </div>
          <h1 className="forgot-title">Thrive360</h1>
          <p className="forgot-subtitle">Reset password by entering the email address</p>

          <form className="forgot-form">
            <label>Email Address</label>
            <input type="email" placeholder="e.g. user@domain.com" className="forgot-input" />

            <button className="resend-in-btn" onClick={() => navigate("/Signin")}>
              Resend
            </button>
          </form>

          <p className="Signup-text">
            {"Don’t have an account?"}{" "}
            <a href="/SignUp" className="Sign-Up-link">
              Sign up
            </a>
          </p>
        </div>

        {/* Hero Image Container */}
        <div className="forgort-centers">
          <div className="c-border"></div>
          <div className="c-backg"></div>
          <img
            src="https://www.groupiso.com/wp-content/uploads/2023/02/woman-laughing-on-phone.png"
            className="hero-pic"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;