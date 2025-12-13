import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  logoutUser } from "../Redux/Features/authSlice";
import RightSidebar from "../../StyleComponent/SideBar/SideBar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // ✅ LOGOUT FUNKSİYASI
  const handleLogout = () => {
    dispatch(logoutUser());
    handleProfileClose();
    navigate("/login");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <div className="flex items-center">
          <img alt="Logo" className="h-12 w-12 rounded-full" />
        </div>

        {/* Navbar Desktop */}
        <nav className="hidden md:flex md:gap-10">
          {["Home","Products","About","Services","Blog","Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="cursor-pointer font-medium hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Profile Avatar */}
          <IconButton onClick={handleProfileClick}>
            <Avatar alt="User" />
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleProfileClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => navigate("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate("/settings")}>
              Settings
            </MenuItem>

            {/* 🔴 LOGOUT */}
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Logout
            </MenuItem>
          </Menu>

          {/* Mobile Sidebar */}
          <div className="md:hidden">
            <RightSidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
