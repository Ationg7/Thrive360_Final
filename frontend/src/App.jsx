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
import AdminNavbar from "./Components/AdminNavbar";
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
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUsers from "./Pages/AdminUsers";
import AdminPosts from "./Pages/AdminPosts";
import AdminChallenges from "./Pages/AdminChallenges";
import AdminAnalytics from "./Pages/AdminAnalytics";
import AdminReports from "./Pages/AdminReports";
import AdminMeditation from "./Pages/AdminMeditation";
import AdminBlogs from "./Pages/AdminBlogs";
import AdminSettings from "./Pages/AdminSettings";
import { useAuth } from "./AuthContext";

function Layout() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  // Debug logging
  console.log('Layout - Current path:', location.pathname, 'isLoggedIn:', isLoggedIn);

  // Define public and excluded routes
  const publicRoutes = ["/", "/signin", "/signup", "/forgotpassword"];
  const adminRoutes = ["/admin-login", "/admin-dashboard", "/admin/users", "/admin/posts", "/admin/challenges", "/admin/meditation", "/admin/blogs", "/admin/analytics", "/admin/reports", "/admin/settings"];
  const noNavbarRoutes = ["/dashboard"];
  const noFooterRoutes = ["/dashboard", "/admin-login", "/admin-dashboard", "/admin/users", "/admin/posts", "/admin/challenges", "/admin/meditation", "/admin/blogs", "/admin/analytics", "/admin/reports", "/admin/settings"];

  const pathname = location.pathname.toLowerCase();

  const isPublicPage = publicRoutes.includes(pathname);
  const isAdminPage = adminRoutes.includes(pathname);
  const isNoNavbarPage = noNavbarRoutes.includes(pathname);
  const isNoFooterPage = noFooterRoutes.includes(pathname);

  return (
    <>
      {/* Render appropriate navbar based on route */}
      {isAdminPage && pathname !== "/admin-login" && <AdminNavbar />}
      {!isNoNavbarPage && !isAdminPage && (isPublicPage ? <Navbars /> : <Navbar />)}

      {/* Render the page content */}
      <Outlet />

      {/* Render Footer if not excluded */}
      {!isNoFooterPage && <Footer />}
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
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
        { path: "admin-login", element: <AdminLogin /> },
        { path: "admin-dashboard", element: <AdminDashboard /> },
        { path: "admin/users", element: <AdminUsers /> },
        { path: "admin/posts", element: <AdminPosts /> },
        { path: "admin/challenges", element: <AdminChallenges /> },
        { path: "admin/meditation", element: <AdminMeditation /> },
        { path: "admin/blogs", element: <AdminBlogs /> },
        { path: "admin/analytics", element: <AdminAnalytics /> },
        { path: "admin/reports", element: <AdminReports /> },
        { path: "admin/settings", element: <AdminSettings /> },
        { path: "guide-detail", element: <GuideDetail /> },
        { path: "blogdetail", element: <BlogDetail /> },
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
