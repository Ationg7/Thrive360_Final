import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Navbars from "./Components/Navbars";
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
import GuideDetail from "./Pages/GuideDetail";
import BlogDetail from "./Pages/BlogDetail";
import Dashboard from "./Components/Dashboard";

import { AuthProvider, useAuth } from "./AuthContext";

function Layout() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Define public and excluded routes
  const publicRoutes = ["/", "/signin", "/signup", "/forgotpassword"];
  const noNavbarRoutes = ["/dashboard"];
  const noFooterRoutes = ["/dashboard"];

  const pathname = location.pathname.toLowerCase();

  const isPublicPage = publicRoutes.includes(pathname);
  const isNoNavbarPage = noNavbarRoutes.includes(pathname);
  const isNoFooterPage = noFooterRoutes.includes(pathname);

  return (
    <>
      {/* Render Navbar/Navbars conditionally */}
      {!isNoNavbarPage && (isPublicPage ? <Navbars /> : <Navbar />)}

      {/* Render the page content */}
      <Outlet />

      {/* Render Footer if not excluded */}
      {!isNoFooterPage && <Footer />}
    </>
  );
}

// Wrap Layout with AuthProvider
function LayoutWrapper() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LayoutWrapper />,
      children: [
        { path: "/", element: <Landing /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "home", element: <Home /> },
        { path: "freedomwall", element: <FreedomWall /> },
        { path: "meditation", element: <Meditation /> },
        { path: "wellnessblog", element: <WellnessBlog /> },
        { path: "challenges", element: <Challenges /> },
        { path: "profile", element: <Profile /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "guide-detail", element: <GuideDetail /> },
        {path: "blogdetail", element : <BlogDetail /> },
        
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
