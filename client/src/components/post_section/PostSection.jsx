import Post from "./Post";
import "./PostSection.css";
import { Link } from "react-router-dom";

const PostSection = () => {
  return (
    <div className="w-75 bg-light pt-5">
      <Link
        to="/:userName/showPost/:postId"
        className="text-decoration-none text-dark"
      >
        <Post />
      </Link>
      <Link
        to="/:userName/showPost/:postId"
        className="text-decoration-none text-dark"
      >
        <Post />
      </Link>
      <Link
        to="/:userName/showPost/:postId"
        className="text-decoration-none text-dark"
      >
        <Post />
      </Link>
      <Link
        to="/:userName/showPost/:postId"
        className="text-decoration-none text-dark"
      >
        <Post />
      </Link>
      <Link
        to="/:userName/showPost/:postId"
        className="text-decoration-none text-dark"
      >
        <Post />
      </Link>
    </div>
  );
};

export default PostSection;
