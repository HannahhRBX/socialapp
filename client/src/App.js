import React, { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";

// Layout component for user authentication
const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user.token == null) {
      //navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
