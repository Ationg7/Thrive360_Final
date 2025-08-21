import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Outlet,
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
import Dashboard from "./Components/Dashboard";

import { AuthProvider, useAuth } from "./AuthContext"; // ✅

function Layout() {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // ✅

  const publicRoutes = ["/", "/SignIn", "/SignUp", "/ForgotPassword"];
  const noNavbarRoutes = ["/Dashboard"];
  const noFooterRoutes = ["/Dashboard"]; // ✅ exclude Footer here

  const pathname = location.pathname;
  const isNoNavbarPage = noNavbarRoutes.includes(pathname);
  const isNoFooterPage = noFooterRoutes.includes(pathname);

  return (
    <>
      {!isNoNavbarPage && (isAuthenticated ? <Navbar /> : <Navbars />)}
      <Outlet />
      {!isNoFooterPage && <Footer />} {/* ✅ only render Footer if not in the list */}
    </>
  );
}

// ✅ Wrap Layout with AuthProvider
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
      element: <LayoutWrapper />, // ✅ wrapped layout
      children: [
        { path: "/", element: <Landing /> },
        { path: "SignIn", element: <SignIn /> },
        { path: "SignUp", element: <SignUp /> },
        { path: "ForgotPassword", element: <ForgotPassword /> },
        { path: "Home", element: <Home /> },
        { path: "FreedomWall", element: <FreedomWall /> },
        { path: "Meditation", element: <Meditation /> },
        { path: "WellnessBlog", element: <WellnessBlog /> },
        { path: "Challenges", element: <Challenges /> },
        { path: "Profile", element: <Profile /> },
        { path: "Dashboard", element: <Dashboard /> },
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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
