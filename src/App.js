import Navbar from "./components/navbar/Navbar";
import CreatePost from "./components/pages/create_post/CreatePost";
import Home from "./components/pages/home/Home";
import PostPage from "./components/pages/post_page/PostPage";
import SettingUp from "./components/pages/setting-update/SettingUp";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SettingUp />
    </div>
  );
}

export default App;
