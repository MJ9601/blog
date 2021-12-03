import Navbar from "./components/navbar/Navbar";
import CreatePost from "./components/pages/create_post/CreatePost";
import Home from "./components/pages/home/Home";
import Home_page from "./components/pages/home_page/Home_page";
import Login from "./components/pages/login/Login";
import PostPage from "./components/pages/post_page/PostPage";
import UnregisteredSetting from "./components/pages/setting-update/UnregisteredSetting";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SettingSec from "./components/pages/setting-update/setting-sec/SettingSec";
import { useState } from "react";

function App() {
  const [User, setUser] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            !User ? (
              <>
                <Navbar setUser={setUser} User={User} /> <Home_page />
              </>
            ) : (
              <>
                <Navbar setUser={setUser} User={User} /> <Home />
              </>
            )
          }
        />
        <Route
          path="/Login"
          element={
            !User && (
              <>
                <Login />
              </>
            )
          }
        />
        <Route
          path="/register"
          element={
            !User && (
              <>
                <Navbar setUser={setUser} User={User} />{" "}
                <UnregisteredSetting User={User} />
              </>
            )
          }
        />
        <Route
          path="/:userName/profile"
          element={
            User ? (
              <>
                <Navbar setUser={setUser} User={User} /> <Home />
              </>
            ) : (
              <>
                <Navbar setUser={setUser} User={User} /> <Home />
              </>
            )
          }
        />
        <Route
          path="/:userName/setting"
          element={
            User && (
              <>
                <Navbar setUser={setUser} User={User} />{" "}
                <SettingSec User={User} />
              </>
            )
          }
        />
        <Route
          path="/:userName/createPost"
          element={
            User && (
              <>
                <Navbar setUser={setUser} User={User} /> <CreatePost />
              </>
            )
          }
        />
        <Route
          path="/:userName/showPost/:PostId"
          element={
            User ? (
              <>
                <Navbar setUser={setUser} User={User} /> <PostPage />
              </>
            ) : (
              <>
                <Navbar setUser={setUser} User={User} /> <PostPage />
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
