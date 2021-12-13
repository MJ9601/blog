import "./Header.css";
import Bg from "./back-1.jpg";
import { FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
const Header = () => {
  const [Show, setShow] = useState(false);
  return (
    <header className="w-100">
      <div className=" img-wrapper">
        <img src={Bg} alt="" className="avator-bg" />
        <div className="d-flex">
          <div className="more">
            <FaEllipsisV
              className="fs-2 moreIcon"
              onClick={() => setShow(!Show)}
            />
            <h2 style={{ display: Show ? "block" : "none" }}>block</h2>
          </div>
          <div className="avator-wrapper">
            <img
              src="https://userstock.io/data/wp-content/uploads/2017/09/michael-dam-258165-300x300.jpg"
              alt=""
              className="avator-img"
            />
            <div className="interactions text-start">
              <div className="row">
                <div className="col ms-4">
                  <div className="info">
                    <h1 className=" name-tag">Jane Doe</h1>
                    <h3 className="prefasion-tag">
                      Web Designer & Web Developer
                    </h3>
                  </div>
                </div>
              </div>
              <div className="row text-start ps-0 mt-3">
                <div className="col text-white text-center">
                  <h4 className="fs-5">Posts</h4>
                  <h5 className="fs-6">200</h5>
                </div>
                <div className="col text-white text-center">
                  <h4 className="fs-5">Follower</h4>
                  <h5 className="fs-6">200</h5>
                </div>
                <div className="col text-white text-center">
                  <h4 className="fs-5">Following</h4>
                  <h5 className="fs-6">200</h5>
                </div>
              </div>
              <div className="row text-center position-absolute ps-3 mt-2 ps-5">
                <div className="col">
                  <button className="btn btn-primary btn-sm me-2 ms-5 px-4">
                    Follow
                  </button>
                  <button className="btn btn-primary btn-sm px-3">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
