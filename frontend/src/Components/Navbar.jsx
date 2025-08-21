import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: check if token exists in localStorage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location]); // re-run when location changes

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear auth
    setIsLoggedIn(false);
    navigate("/Signin"); // redirect to SignIn page
  };

  return (
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
              <Link to="/Home" className={isActive("/Home")}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/FreedomWall" className={isActive("/FreedomWall")}>
                Freedom Wall
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/WellnessBlog" className={isActive("/WellnessBlog")}>
                Wellness Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Meditation" className={isActive("/Meditation")}>
                Meditation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Challenges" className={isActive("/Challenges")}>
                Challenges
              </Link>
            </li>
          </ul>

          {isLoggedIn ? (
            <div className="d-flex align-items-center gap-3">
              <Link to="/Profile">
                <img
                  src="https://i.pinimg.com/736x/c2/5f/45/c25f4555a84d5beb9663c9aa46301558.jpg"
                  alt="Profile"
                  width="60"
                  height="60"
                  className="rounded-circle"
                  style={{ cursor: "pointer" }}
                />
              </Link>

              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/Signin">
                <button className="btn btn-outline-success" type="button">
                  Login
                </button>
              </Link>
              <Link to="/SignUp">
                <button className="btn btn-success" type="button">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
