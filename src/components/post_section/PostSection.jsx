import Post from "./Post";
import "./PostSection.css";

const PostSection = () => {
  return (
    <div className="w-75 bg-light pt-5">
      <a href="#" className="text-decoration-none text-dark">
        <Post />
      </a>
      <a href="#" className="text-decoration-none text-dark">
        <Post />
      </a>
      <a href="#" className="text-decoration-none text-dark">
        <Post />
      </a>
    </div>
  );
};

export default PostSection;
