"use client";
import { lazy, Suspense, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const { authState, setAuthState } = useContext(AuthContext) || { authState: null, setAuthState: () => {} };
  const [isSidebar, setIsSidebar] = useState(true);
  // cannot destructure property "authState" of (0, react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AuthContext) as it is null.

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <CssBaseline />
        <ToastContainer />
        <Suspense fallback={<div>Loading... please wait</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Suspense>
        <div className="app">
          <SideBar isSidebar={isSidebar} />
          <main className="content">
            <Header setIsSidebar={setIsSidebar} />
            <div className="content_body">
              <Box m="20px">
                <Suspense fallback={<div>Loading... please wait</div>}>
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
                </Suspense>
              </Box>
            </div>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
