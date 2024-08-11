"use client";
import { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./layout/SideBar";
import Header from "./layout/Header";

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Customers = lazy(() => import("./pages/customers/Customers"));
const Employees = lazy(() => import("./pages/employees/Employees"));
const Services = lazy(() => import("./pages/services/Services"));
const Items = lazy(() => import("./pages/items/Items"));
const Prices = lazy(() => import("./pages/prices/Prices"));
const Supplies = lazy(() => import("./pages/supplies/Supplies"));
const Expenses = lazy(() => import("./pages/expenses/Expenses"));
const Payments = lazy(() => import("./pages/payments/Payments"));
const Inventories = lazy(() => import("./pages/inventories/Inventories"));
const Deliveries = lazy(() => import("./pages/deliveries/Deliveries"));

const App = () => {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <>
            <Router>
                <CssBaseline />
                <ToastContainer />
                <div className="app">
                    <SideBar isSidebar={isSidebar} />
                    <main className="content">
                        <Header setIsSidebar={setIsSidebar} />
                        <div className="content_body">
                            <Box m="20px">
                                <Suspense fallback={<div>Loading... please wait</div>}>
                                    <Routes>
                                        <Route path="/admin" element={<Dashboard />} />
                                        <Route path="/customers" element={<Customers />} />
                                        <Route path="/employees" element={<Employees />} />
                                        <Route path="/services" element={<Services />} />
                                        <Route path="/items" element={<Items />} />
                                        <Route path="/prices" element={<Prices />} />
                                        <Route path="/supplies" element={<Supplies />} />
                                        <Route path="/expenses" element={<Expenses />} />
                                        <Route path="/payments" element={<Payments />} />
                                        <Route path="/inventories" element={<Inventories />} />
                                        <Route path="/deliveries" element={<Deliveries />} />
                                        <Route path="*" element={<div>Oops! Page Not Found</div>} />
                                    </Routes>
                                </Suspense>
                            </Box>
                        </div>
                    </main>
                </div>
            </Router>
        </>
    );
};

export default App;
