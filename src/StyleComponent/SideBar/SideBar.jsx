import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";

function RightSidebar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);

  const menuItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Services", icon: <MiscellaneousServicesIcon />, path: "/services" },
    { label: "Products", icon: <ShoppingCartIcon />, path: "/products" },
    { label: "Blog", icon: <ArticleIcon />, path: "/blog" },
    { label: "Contact", icon: <ContactMailIcon />, path: "/contact" },
  ];

  return (
    <div>
      <MenuIcon fontSize="large" className="cursor-pointer" onClick={toggleDrawer(true)} />
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => {
                    window.location.href = item.path;
                    setOpen(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default RightSidebar;
