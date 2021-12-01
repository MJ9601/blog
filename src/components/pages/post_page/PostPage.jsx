import { ShowPost } from "../../show_post/ShowPost";
import SideBar from "../../side_bar/SideBar";
import Footer from "../../footer/Footer";
import "./PostPage.css";

const PostPage = () => {
  return (
    <>
      <section className="d-flex w-100">
        <ShowPost />
        <SideBar />
      </section>
      <Footer />
    </>
  );
};

export default PostPage;
