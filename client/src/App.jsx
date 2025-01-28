"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SideBar from "./layout/SideBar";
import Header from "./layout/Header";
import { AuthContext } from "./helper/AuthContext";

const PageNotFound = lazy(() => import("./pages/notfound/PageNotFound"));
const Login = lazy(() => import("./pages/login/Login"));
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
  const log = useRef(true);
  const [authState, setAuthState] = useState({ id: 0, name: ``, username: ``, type: `` });
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    if (log.current) {
      log.current = false;
      axios.get(`/api/v1/auth`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState });
        } else {
          setAuthState({ id: res.data.id, name: res.data.name, username: res.data.username, type: res.data.type });
        }
      });
    }
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <CssBaseline />
        <ToastContainer />
        <Suspense fallback={<div>Loading... please wait</div>}>
          {authState.username ? (
            <div className="app">
              <SideBar isSidebar={isSidebar} />
              <main className="content">
                <Header setIsSidebar={setIsSidebar} />
                <div className="content_body">
                  <Box m="20px">
                    <Routes>
                      {/* Redirect to dashboard page if the user is logged in */}
                      <Route path="/dashboard" element={authState.type === "admin" ? <Dashboard /> : <Navigate to="/login" />} />
                      <Route path="/customers" element={authState.type === "manager" ? <Customers /> : <Navigate to="/login" />} />
                      <Route path="/employees" element={authState.type === "manager" ? <Employees /> : <Navigate to="/login" />} />
                      <Route path="/services" element={authState.type === "manager" ? <Services /> : <Navigate to="/login" />} />
                      <Route path="/items" element={authState.type === "manager" ? <Items /> : <Navigate to="/login" />} />
                      <Route path="/prices" element={authState.type === "manager" ? <Prices /> : <Navigate to="/login" />} />
                      <Route path="/supplies" element={authState.type === "manager" ? <Supplies /> : <Navigate to="/login" />} />
                      <Route path="/expenses" element={authState.type === "user" ? <Expenses /> : <Navigate to="/login" />} />
                      <Route path="/payments" element={authState.type === "user" ? <Payments /> : <Navigate to="/login" />} />
                      <Route path="/inventories" element={authState.type === "user" ? <Inventories /> : <Navigate to="/login" />} />
                      <Route path="/deliveries" element={authState.type === "user" ? <Deliveries /> : <Navigate to="/login" />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </Box>
                </div>
              </main>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          )}
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
