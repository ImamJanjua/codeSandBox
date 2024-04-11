import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "../Layout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Calendar from "../pages/Calendar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </>
  )
);

export default router;
