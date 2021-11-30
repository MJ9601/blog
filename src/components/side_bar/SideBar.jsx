import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="w-25 pt-5 bg-light sideBar-section">
      <div className="container text-center w-100 about-me">
        <h1 className="text-uppercase about-me-header">about me</h1>
      </div>
      <div className="info-wrapper">
        <img
          src="https://kaboompics.com/cache/1/1/d/9/4/11d94c61aed94eb109ca8bb12221a1c6a65ee387.jpeg"
          alt=""
          className="img-fluid mt-4 info-img"
        />
        <p className=" about-me-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          quidem quo facere non debitis iusto quos, dolor voluptate? Magnam
          molestias ipsam mollitia debitis. Laboriosam, nulla!
        </p>
        <h1 className="intrest text-uppercase mt-4">passions</h1>
        <ul className="mt-3 passion-group">
          <li className="passion-item">
            <a href="#" className="passion-link">
              Music
            </a>
          </li>
          <li className="passion-item">
            <a href="#" className="passion-link">
              Movies
            </a>
          </li>
          <li className="passion-item">
            <a href="#" className="passion-link">
              Life
            </a>
          </li>
          <li className="passion-item">
            <a href="#" className="passion-link">
              Fashion
            </a>
          </li>
          <li className="passion-item">
            <a href="#" className="passion-link">
              Tech
            </a>
          </li>
          <li className="passion-item">
            <a href="#" className="passion-link">
              Sport
            </a>
          </li>
        </ul>
        <h1 className="mt-3 media text-uppercase">find me here</h1>
        <div className="d-flex">
          <a href="#" className="navbar-brand">
            <FaFacebook className="media-icons mx-1 p-0 fs-4" />
          </a>
          <a href="#" className="navbar-brand">
            <FaPinterest className="media-icons mx-1 p-0 fs-4" />
          </a>
          <a href="#" className="navbar-brand">
            <FaInstagram className="media-icons mx-1 p-0 fs-4" />
          </a>
          <a href="#" className="navbar-brand">
            <FaTwitter className="media-icons mx-1 p-0 fs-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
