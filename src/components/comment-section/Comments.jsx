import { FaReply, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import "./Comments.css";

const Comments = () => {
  return (
    <div className="opinion-tag container pt-5">
      <h1 className="fs-4">Comments:</h1>
      <div className=" ms-5 mb-5 mt-1 d-flex align-items-start">
        <img
          src="https://userstock.io/data/wp-content/uploads/2020/06/women-s-white-and-black-button-up-collared-shirt-774909-2-1024x1024.jpg"
          alt=""
          className="img-fluid img-avator-comment me-2"
        />
        <div className="user-comment w-75 mx-3 bg-white">
          <p className="fs-6 p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            reprehenderit! Iure, accusantium! Voluptatibus debitis nisi eum,
            ducimus ad dolore officiis culpa qui molestias alias deleniti fugiat
            libero, labore numquam a? Facilis quibusdam rerum quam, nisi hic,
            quisquam laborum saepe eos dolorem consequatur nobis quaerat
            incidunt sint soluta laboriosam atque. Cupiditate.
          </p>
          <div className="d-flex justify-content-end">
            <a href="#">
              <FaReply className="fs-5 text-secondary me-3 icon-comment mb-2" />
            </a>
            <a href="#">
              <FaThumbsUp className="fs-5 text-secondary me-3 icon-comment mb-2" />
            </a>
            <a href="#">
              <FaThumbsDown className="fs-5 text-secondary me-3 icon-comment mb-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
