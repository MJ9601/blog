import "./Home.css";
import Header from "../../header/Header";
import PostSection from "../../post_section/PostSection";
import SideBar from "../../side_bar/SideBar";
import Footer from "../../footer/Footer";
import { Chat } from "../chatPage/Chat";

const Home = () => {
  return (
    <>
      <Header />
      <div className="d-flex">
        <PostSection />
        <SideBar />
      </div>
      <Footer />
      {/* <Chat /> */}
    </>
  );
};

export default Home;
