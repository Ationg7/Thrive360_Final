import { Image } from "react-bootstrap";
import logo from "../assets/Images/logo.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to send reset link");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <div className="signup-card">
          <FaArrowLeft className="back-arrow" onClick={() => navigate(-1)} />
          <div className="logo-container">
            <Image src={logo} alt="Logo" className="form-logo" />
          </div>
          <h1 className="title">Thrive360</h1>

          <p className="description">
            Enter your email address to receive password reset instructions.
          </p>

          <form className="forgot-form" onSubmit={handleResend}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <input
                  type="email"
                  placeholder="e.g. user@domain.com"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <div
                  className="tooltip-error"
                  style={{ marginTop: "5px", display: "block" }}
                >
                  ⚠ {error}
                </div>
              )}
            </div>

            <button
              className="register-btn"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Resend
            </button>
          </form>

          <p className="signup-text" style={{ marginTop: "20px" }}>
            Don’t have an account?{" "}
            <Link to="/SignUp" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>

        <div className="text-centers">
          <div className="circle-borders"></div>
          <div className="circle-backg"></div>
          <img
            src="https://www.groupiso.com/wp-content/uploads/2023/02/woman-laughing-on-phone.png"
            className="img-hero"
            alt="Hero"
          />
        </div>
      </div>

      {success && (
        <div className="snackbar">
          Password reset instructions sent to {email}!
        </div>
      )}

      <style>{`
        .signup-card {
          max-width: 400px; 
          padding: 40px 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 550px; 
          position: relative;
        }
        
        .back-arrow {
          font-size: 18px;
          cursor: pointer;
          align-self: flex-start;
          margin-bottom: 10px;
        }

        .tooltip-error {
          background: #dc3545;
          color: #fff;
          padding: 2px 8px;
          font-size: 0.75rem;
          border-radius: 4px;
          white-space: nowrap;
        }

        .snackbar {
          visibility: visible;
          min-width: 280px;
          background-color: #28a745;
          color: #fff;
          text-align: center;
          border-radius: 8px;
          padding: 14px 24px;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          font-weight: 500;
          opacity: 0;
          transform: translateY(-20px);
          animation: slideIn 0.3s forwards, fadeOut 0.3s 1.7s forwards;
        }

        @keyframes slideIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>
      <style>{`
  /* ---------- Mobile & tablet responsive adjustments ---------- */
  @media (max-width: 768px) {
    .signup-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      padding: 10px;
      box-sizing: border-box;
    }

    .signup-card {
      width: 90%;
      padding: 25px 20px;
      min-height: auto;
      margin: 0;
    }

    .form-logo {
      width: 55px;
      margin-bottom: 12px;
    }

    .title {
      font-size: 1.5rem;
      margin-bottom: 8px;
      text-align: center;
    }

    .description {
      font-size: 0.9rem;
      margin-bottom: 14px;
      text-align: center;
    }

    .input-field {
      font-size: 0.9rem;
      padding: 8px 10px;
      margin-bottom: 12px;
    }

    .register-btn {
      width: 100%;
      font-size: 0.9rem;
      padding: 8px;
      margin-bottom: 12px;
    }

    .signup-text {
      font-size: 0.85rem;
      text-align: center;
      width: 100%;
      margin-top: 8px;
    }

    .tooltip-error {
      font-size: 0.75rem;
      padding: 2px 6px;
    }

    .img-hero {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .signup-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }

    .signup-card {
      width: 90%;
      padding: 15px 12px;
      margin: 0;
    }

    .form-logo {
      width: 50px;
      margin-bottom: 10px;
    }

    .title {
      font-size: 1.3rem;
      margin-bottom: 6px;
      text-align: center;
    }

    .description {
      font-size: 0.8rem;
      margin-bottom: 12px;
      text-align: center;
    }

    .input-field {
      font-size: 0.8rem;
      padding: 7px 9px;
      margin-bottom: 10px;
    }

    .register-btn {
      width: 100%;
      font-size: 0.8rem;
      padding: 7px;
      margin-bottom: 10px;
    }

    .signup-text {
      font-size: 0.75rem;
      margin-top: 6px;
      width: 100%;
      text-align: center;
    }

    .tooltip-error {
      font-size: 0.7rem;
      padding: 2px 4px;
    }

    .img-hero {
      display: none;
    }
  }
`}</style>

    </div>
  );
};

export default ForgotPassword;
