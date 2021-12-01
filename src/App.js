import NavbarUnregistered from "./components/navbar-unregistered/NavbarUnregistered";
import Navbar from "./components/navbar/Navbar";
import CreatePost from "./components/pages/create_post/CreatePost";
import Home from "./components/pages/home/Home";
import Home_page from "./components/pages/home_page/Home_page";
import Login from "./components/pages/login/Login";
import PostPage from "./components/pages/post_page/PostPage";
import UnregisteredSetting from "./components/pages/setting-update/UnregisteredSetting";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SettingSec from "./components/pages/setting-update/setting-sec/SettingSec";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <NavbarUnregistered /> <Home_page />{" "}
            </>
          }
        />
        <Route
          exact
          path="/Login"
          element={
            <>
              <Login />{" "}
            </>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <>
              <NavbarUnregistered /> <UnregisteredSetting />
            </>
          }
        />
        <Route
          exact
          path="/:userName/profile"
          element={
            <>
              <Navbar /> <Home />
            </>
          }
        />
        <Route
          exact
          path="/:userName/setting"
          element={
            <>
              <Navbar /> <SettingSec />
            </>
          }
        />
        <Route
          exact
          path="/:userName/createPost"
          element={
            <>
              <Navbar /> <CreatePost />
            </>
          }
        />
        <Route
          exact
          path="/:userName/showPost/:PostId"
          element={
            <>
              <Navbar /> <PostPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
