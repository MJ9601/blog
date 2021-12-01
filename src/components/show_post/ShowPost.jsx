import { Media } from "../media/Media";
import "./ShowPost.css";
import CreateComment from "../create_comment/CreateComment";
import Comments from "../comment-section/Comments";
import PostHeader from "./post_header/PostHeader";
import PostDetails from "./post_details/PostDetails";
import { useState } from "react";

export const ShowPost = () => {
  const [Replay, setReplay] = useState(false);
  return (
    <section className="w-75 header-section bg-light">
      <div className="w-100 px-3">
        <PostHeader />
        <PostDetails />
        <Media />
        <CreateComment text={"Share your opinions..."} />
        <Comments setReplay={setReplay} />
        {Replay && <CreateComment text={"replay .."} Replay={Replay} />}
      </div>
    </section>
  );
};
