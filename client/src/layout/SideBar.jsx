"use client";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AppRegistration from "@mui/icons-material/AppRegistration";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAdd";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ExpandOutlinedIcon from "@mui/icons-material/ExpandOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar collapsed={isCollapsed} toggled={toggled} onBackdropClick={() => setToggled(false)} onBreakPoint={setBroken} image="/assets/17372.jpg" breakPoint="md" style={{ height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : null}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                    <Typography>LAUNDRY MS</Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <img alt="profile-user" width="100px" height="100px" src={`/assets/user.jpg`} style={{ cursor: "pointer", borderRadius: "50%" }} />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "10px 0 0 0" }}>LAUNDRY</Typography>
                    <Typography>DEV</Typography>
                  </Box>
                </Box>
              )}
              <>
                <NavLink to="/dashboard" className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                  <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
                </NavLink>

                <SubMenu icon={<AppRegistration />} label="Registration">
                  <NavLink to={"/customers"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<GroupsOutlinedIcon />}>Customers</MenuItem>
                  </NavLink>
                  <NavLink to={"/employees"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<PersonAddOutlinedIcon />}>Employees</MenuItem>
                  </NavLink>
                  <NavLink to={"/services"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<LocalLaundryServiceOutlinedIcon />}>Services</MenuItem>
                  </NavLink>
                  <NavLink to={"/items"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<CheckroomOutlinedIcon />}>Items</MenuItem>
                  </NavLink>
                  <NavLink to={"/prices"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<AttachMoneyOutlinedIcon />}>Prices</MenuItem>
                  </NavLink>
                  <NavLink to={"/supplies"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<InventoryOutlinedIcon />}>Supplies</MenuItem>
                  </NavLink>
                </SubMenu>

                <SubMenu icon={<ExpandOutlinedIcon />} label="Expenditure">
                  <NavLink to={"/expenses"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<ExpandCircleDownOutlinedIcon />}>Expenses</MenuItem>
                  </NavLink>
                  <NavLink to={"/payments"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<PaymentOutlinedIcon />}>Payments</MenuItem>
                  </NavLink>
                </SubMenu>

                <SubMenu icon={<StorefrontOutlinedIcon />} label="Stock Management">
                  <NavLink to={"/inventories"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<Inventory2OutlinedIcon />}>Inventories</MenuItem>
                  </NavLink>
                  <NavLink to={"/deliveries"} className="menu-bars" style={{ textDecoration: "none", color: "inherit" }}>
                    <MenuItem icon={<DeliveryDiningOutlinedIcon />}>Deliveries</MenuItem>
                  </NavLink>
                </SubMenu>
              </>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: isCollapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
                Extra
              </Typography>
            </div>

            <Menu>
              <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
              <MenuItem icon={<ReceiptOutlinedIcon />}>Documentation</MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SideBar;
