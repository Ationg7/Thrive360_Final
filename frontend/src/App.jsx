import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar"; // Authenticated Navbar
import Navbars from "./Components/Navbars"; // Public Navbar
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import FreedomWall from "./Pages/FreedomWall";
import Meditation from "./Pages/Meditation";
import Challenges from "./Pages/Challenges";
import Landing from "./Pages/Landing";
import WellnessBlog from "./Pages/WellnessBlog";

function Layout() {
  const location = useLocation();

  // Define routes that should use the public navbar
  const publicRoutes = ["/", "/SignIn", "/SignUp", "/ForgotPassword"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  return (
    <>
      {isPublicPage ? <Navbars /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/FreedomWall" element={<FreedomWall />} />
        <Route path="/Meditation" element={<Meditation />} />
        <Route path="/WellnessBlog" element={<WellnessBlog />} />
        <Route path="/Challenges" element={<Challenges />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
