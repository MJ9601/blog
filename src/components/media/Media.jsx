import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import "./Media.css";

export const Media = () => {
  return (
    <div className="c-section">
      <FaComment className="fs-4 me-1  comment-section-icon" />
      <span className="counter fs-6 me-3">200</span>
      <FaThumbsUp className="fs-4 me-1  comment-section-icon" />
      <span className="counter fs-6 me-3">200</span>
      <FaThumbsDown className="fs-4 me-1  comment-section-icon" />
      <span className="counter fs-6 me-3">200</span>
      <FaShare className="fs-4 comment-section-icon" />
    </div>
  );
};
