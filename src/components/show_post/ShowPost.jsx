import { Media } from "../media/Media";
import "./ShowPost.css";
import CreateComment from "../create_comment/CreateComment";
import Comments from "../comment-section/Comments";
import PostHeader from "./post_header/PostHeader";
import PostDetails from "./post_details/PostDetails";

export const ShowPost = () => {
  return (
    <section className="w-75 header-section bg-light">
      <div className="w-100 px-3">
        <PostHeader />
        <PostDetails />
        <Media />
        <CreateComment />
        <Comments />
      </div>
    </section>
  );
};
