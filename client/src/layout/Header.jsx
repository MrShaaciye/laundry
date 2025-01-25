"use client";
import { useContext, useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../helper/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const HeaderBar = () => {
  // Define States
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle Functions
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // log out function
  const logout = () => {
    localStorage.removeItem(`accessToken`);
    setAuthState({ id: 0, name: ``, username: ``, type: `` });
    return navigate("/");
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={1.5}>
      <Box display="flex" borderRadius="3px" backgroundColor="#F5EFE7">
        <InputBase sx={{ ml: 2, flex: 1 }} id="search" placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon onClick={handleMenu} />
          <Menu
            id="menu-header"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <NavLink to="/profile" className="menu-bars">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </NavLink>
            <NavLink to="#" className="menu-bars">
              <MenuItem onClick={handleClose}>{`Hi, ${authState?.username ? authState.username.toUpperCase() : ""}`}</MenuItem>
            </NavLink>
            <NavLink to="/" className="menu-bars" onClick={logout}>
              <MenuItem>Logout</MenuItem>
            </NavLink>
          </Menu>
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderBar;
