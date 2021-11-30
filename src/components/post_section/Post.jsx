import {
  FaClock,
  FaComment,
  FaMapMarkerAlt,
  FaShare,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import "./Post.css";

const Post = () => {
  return (
    <div className="w-100 px-5 my-4">
      <div className="container">
        <div className="bg-white ">
          <div className="row">
            <div className="col-12 col-md-4">
              <img
                src="https://kaboompics.com/cache/2/d/b/e/6/2dbe60b0dfd77cfda2acf44159097cf58ba874ec.jpeg"
                alt=""
                className="img-fluid img-post mb-3"
              />
              <div className="pic-info-wrapper">
                <div className="d-flex align-items-center">
                  <FaMapMarkerAlt className="fs-5 me-2 mb-2 text-secondary" />
                  <span className="fs-6 mb-1 text-secondary pic-info">
                    Itily
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <FaClock className="fs-5 me-2 mb-2 text-secondary" />
                  <span className="fs-6 mb-1 text-secondary pic-info">
                    31 jan, 2021
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 post-details">
              <h1 className="fs-3 post-title pt-4 pb-2">Post title</h1>
              <p className="lead post-text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
                nisi illum ipsam iste porro, velit vel quos tempore soluta
                dolore ipsa praesentium quidem blanditiis neque quia maxime
                ratione quas quisquam quae! Rem cum eos totam consequatur error
                impedit reprehenderit aperiam!
              </p>
              <div className="row comment-section w-100">
                <div className="offset-2 offset-lg-8 col-10 col-lg-4 align-items-center d-flex">
                  <FaComment className="fs-4 me-1  comment-section-icon" />
                  <span className="counter fs-6 me-3">200</span>
                  <FaThumbsUp className="fs-4 me-1  comment-section-icon" />
                  <span className="counter fs-6 me-3">200</span>
                  <FaThumbsDown className="fs-4 me-1  comment-section-icon" />
                  <span className="counter fs-6 me-3">200</span>
                  <FaShare className="fs-4 comment-section-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
