import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDayDreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink /* useNavigate */ } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <div className="sidebar">
                <div className="top">
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <span className="logo">Laundry</span>
                    </NavLink>
                </div>
                <hr />
                <div className="center">
                    <ul>
                        <p className="title">MAIN</p>
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            <li>
                                <DashboardIcon className="icon" />
                                <span>Dashboard</span>
                            </li>
                        </NavLink>
                        <p className="title">LIST</p>
                        <NavLink to="/Users" style={{ textDecoration: "none" }}>
                            <li>
                                <PersonOutlineOutlinedIcon className="icon" />
                                <span>Users</span>
                            </li>
                        </NavLink>
                        <NavLink to="/products" style={{ textDecoration: "none" }}>
                            <li>
                                <StoreIcon className="icon" />
                                <span>Products</span>
                            </li>
                        </NavLink>
                        <NavLink to="/orders" style={{ textDecoration: "none" }}>
                            <li>
                                <CreditCardCardIcon className="icon" />
                                <span>Orders</span>
                            </li>
                        </NavLink>
                        <NavLink to="/deliveries" style={{ textDecoration: "none" }}>
                            <li>
                                <LocalShippingIcon className="icon" />
                                <span>Delivery</span>
                            </li>
                        </NavLink>
                        <p className="title">USEFUL</p>
                        <NavLink to="/stats" style={{ textDecoration: "none" }}>
                            <li>
                                <InsertChartIcon className="icon" />
                                <span>Stats</span>
                            </li>
                        </NavLink>
                        <NavLink to="/notifications" style={{ textDecoration: "none" }}>
                            <li>
                                <NotificationsNoneIcon className="icon" />
                                <span>Notifications</span>
                            </li>
                        </NavLink>
                        <p className="title">SERVICE</p>
                        <NavLink to="/systems" style={{ textDecoration: "none" }}>
                            <li>
                                <SettingsSystemDayDreamOutlinedIcon className="icon" />
                                <span>System Health</span>
                            </li>
                        </NavLink>
                        <NavLink to="/logs" style={{ textDecoration: "none" }}>
                            <li>
                                <PsychologyOutlinedIcon className="icon" />
                                <span>Logs</span>
                            </li>
                        </NavLink>
                        <NavLink to="/settings" style={{ textDecoration: "none" }}>
                            <li>
                                <SettingsApplicationsIcon className="icon" />
                                <span>Settings</span>
                            </li>
                        </NavLink>
                        <p className="title">USER</p>
                        <NavLink to="/profile" style={{ textDecoration: "none" }}>
                            <li>
                                <AccountCircleOutlinedIcon className="icon" />
                                <span>Profile</span>
                            </li>
                        </NavLink>
                        <NavLink to="/logout" style={{ textDecoration: "none" }}>
                            <li>
                                <ExitToAppIcon className="icon" />
                                <span>Logout</span>
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="bottom">
                    <div className="colorOption"></div>
                    <div className="colorOption"></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
