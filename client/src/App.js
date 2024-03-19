import React, { useEffect } from "react";
import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";

// Layout component for user authentication
const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    if (user.token == null && location.pathname !== '/login') {
      //navigate("/login");
    }
  }, [user, navigate, location]);

  return (
    <div>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/changePassword" element={<ChangePassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
