import { FaImage, FaMapMarkerAlt, FaPlaneSlash } from "react-icons/fa";
import "./CreatePost.css";

const CreatePost = () => {
  return (
    <section className="w-100 bg-light">
      <form className="container-fluid">
        <div className="text-center">
          <img
            src="https://kaboompics.com/cache/a/e/0/a/d/ae0ad6575aa025777d396cc7c7f0269bcc1f0b02.jpeg"
            alt=""
            className="posted-img"
          />
        </div>
        <div className="px-5 py-5 position-relative">
          <input
            type="submit"
            value="Publish"
            className="btn btn-success publish-btn"
          />
          <div className="d-flex px-5">
            <label htmlFor="imgPost">
              <FaImage className="imgtag mb-3" />
            </label>
            <input type="file" id="imgPost" className="d-none" />

            <input type="text" className="input-tag" placeholder="Title" />
            <input
              type="text"
              placeholder="Location"
              className="input-tag loc"
            />
          </div>
          <div>
            <textarea
              className="input-tag"
              placeholder="Tell your stroy .."
            ></textarea>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
