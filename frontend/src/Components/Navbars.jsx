import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Avatar from "./Avatar";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);     // ✅ success toast
  const [showConfirm, setShowConfirm] = useState(false);     // ✅ confirm modal
  const [userEmail, setUserEmail] = useState("");            // ✅ email for modal

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "");
  }, [location]);

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  // 🔘 Click "Logout" → open confirm modal (do NOT log out yet)
  const openLogoutConfirm = () => {
    setShowConfirm(true);
  };

  // ✅ Actual logout after confirm
  const performLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setShowConfirm(false);      // close modal
    setShowSuccess(true);       // show success toast
    setTimeout(() => setShowSuccess(false), 3000); // auto-hide
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <img
            src="https://cdn-icons-png.flaticon.com/128/11289/11289042.png"
            width="70"
            height="70"
            alt="Thrive360 Logo"
          />
          <span className="ms-2 fw-bold text-white">Thrive360</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className={isActive("/home")}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/freedomwall" className={isActive("/freedomwall")}>Freedom Wall</Link>
              </li>
              <li className="nav-item">
                <Link to="/wellnessblog" className={isActive("/wellnessblog")}>Wellness Blog</Link>
              </li>
              <li className="nav-item">
                <Link to="/meditation" className={isActive("/meditation")}>Meditation</Link>
              </li>
              <li className="nav-item">
                <Link to="/challenges" className={isActive("/challenges")}>Challenges</Link>
              </li>
            </ul>

            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-3">
                <Link to="/profile">
                  
                  <Avatar email={userEmail} size={45} />  
                </Link>

                {/* 🔘 Now opens confirm modal */}
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={openLogoutConfirm}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/signin">
                  <button className="btn btn-outline-success" type="button">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-success" type="button">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Confirm Logout Modal (green/white theme) */}
      {showConfirm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.35)", zIndex: 9999 }}
        >
          <div
            className="rounded-4 shadow-lg p-4"
            style={{ background: "#fff", width: "380px", maxWidth: "92%" }}
          >
            <h5 className="fw-bold mb-2 " style={{ color: "#2e7d32" }}>
              Are you sure you want to log out?
            </h5>
            <p className="text-muted mb-4">
              Log out of Thrive360{userEmail ? <> as <b className="text-dark">{userEmail}</b></> : ""}?
            </p>

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn fw-bold px-4 py-2 rounded-pill"
                style={{ background: "#e8f5e9", color: "#2e7d32", border: "1px solid #c8e6c9" }}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn fw-bold px-4 py-2 rounded-pill"
                style={{ background: "#2e7d32", color: "#fff", border: "none" }}
                onClick={performLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Success Toast after logout */}
      {showSuccess && (
        <div
          className="position-fixed top-0 end-0 m-4"
          style={{ zIndex: 9999, animation: "slideInOut 3s forwards" }}
        >
          <div
            className="d-flex align-items-center shadow rounded-3 px-3 py-2 gap-2"
            style={{ background: "black", color: "white", minWidth: "300px" , minHeight : "50px" }}
          >
            <span aria-hidden="true">✅</span>
            <span className="fw-semibold">You successfully logged out</span>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes slideInOut {
            0% { opacity: 0; transform: translateX(120%); }
            10% { opacity: 1; transform: translateX(0); }
            90% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(120%); }
          }
        `}
      </style>
    </>
  );
}

export default NavigationBar;
