"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SideBar from "./layout/SideBar";
import Header from "./layout/Header";
import { AuthContext } from "./helper/AuthContext";
import PageNotFound from "./pages/notfound/PageNotFound";

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
  const [authState, setAuthState] = useState({ id: 0, name: ``, username: ``, type: ``, token: `` });
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    if (log.current) {
      log.current = false;
      axios.get(`/api/v1/auth`, { headers: { accessToken: localStorage.getItem("accessToken") } }).then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, token: `` });
        } else {
          setAuthState({ id: res.data.id, name: res.data.name, username: res.data.username, type: res.data.type, token: res.data.token });
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
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>

          <div className="app">
            <SideBar isSidebar={isSidebar} />
            <main className="content">
              <Header setIsSidebar={setIsSidebar} />
              <div className="content_body">
                <Box m="20px">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
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
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Box>
              </div>
            </main>
          </div>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
