import { FaEdit, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import "./PostHeader.css";

const PostHeader = () => {
  return (
    <>
      <img
        src="https://kaboompics.com/cache/2/d/b/e/6/2dbe60b0dfd77cfda2acf44159097cf58ba874ec.jpeg"
        alt=""
        className="w-100 img-fluid post-img"
      />
      <div className="post-icons w-100 pt-1 d-flex justify-content-between">
        <div className="d-flex justify-content-between align-items-center text-secondary">
          <FaMapMarkerAlt className="fs-6 me-1 mb-1" />
          <span className="fs-5">Itily</span>
        </div>
        <ul className="d-flex justify-content-between">
          <li className="">
            <a href="#" className="fs-4 text-secondary post-icons me-2">
              <FaEdit />
            </a>
          </li>
          <li className="">
            <a href="#" className="fs-4 text-secondary post-icons me-2 ">
              <FaTrashAlt />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PostHeader;
