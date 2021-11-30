import "./Home.css";
import Header from "../../header/Header";
import PostSection from "../../post_section/PostSection";
import SideBar from "../../side_bar/SideBar";

const Home = () => {
  return (
    <>
      <Header />
      <div className="d-flex">
        <PostSection />
        <SideBar />
      </div>
    </>
  );
};

export default Home;
