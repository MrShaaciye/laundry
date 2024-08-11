import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const List = lazy(() => import("./pages/list/List"));
const New = lazy(() => import("./pages/new/New"));
const Single = lazy(() => import("./pages/single/Single"));

const App = () => {
    return (
        <div className="App">
            <Router>
                <Suspense fallback={<div>Loading... please wait</div>}>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="users">
                                <Route index element={<List />} />
                                <Route path=":userId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="products">
                                <Route index element={<List />} />
                                <Route path=":productId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="orders">
                                <Route index element={<List />} />
                                <Route path=":orderId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="deliveries">
                                <Route index element={<List />} />
                                <Route path=":orderId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="stats">
                                <Route index element={<List />} />
                                <Route path=":statId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="stats">
                                <Route index element={<List />} />
                                <Route path=":statId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="notifications">
                                <Route index element={<List />} />
                                <Route path=":notificationId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="systems">
                                <Route index element={<List />} />
                                <Route path=":systemId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="logs">
                                <Route index element={<List />} />
                                <Route path=":logId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="settings">
                                <Route index element={<List />} />
                                <Route path=":settingId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="profile">
                                <Route index element={<List />} />
                                <Route path=":profileId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                            <Route path="logout">
                                <Route index element={<List />} />
                                <Route path=":profileId" element={<Single />} />
                                <Route path="new" element={<New />} />
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
};

export default App;
