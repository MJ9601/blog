import "./Navbar.css";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaSearch,
  FaSignOutAlt,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid navbar-container px-5">
          <div>
            <a href="#" className="navbar-brand fs-4 fw-bold brand">
              Blog<span className="brand">Away</span>
            </a>
          </div>
          <div>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/:userName/profile"
                  className="nav-link text-uppercase navbar-link-custome"
                >
                  home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="#about"
                  className="nav-link text-uppercase navbar-link-custome"
                >
                  about
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#contact"
                  className="nav-link text-uppercase navbar-link-custome"
                >
                  contact
                </a>
              </li>
              <li className="nav-item">
                <Link
                  to="/:userName/createPost"
                  className="nav-link text-uppercase navbar-link-custome"
                >
                  write
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center justfy-content-between">
            <Link to="/:userName/profile">
              <img
                src="https://userstock.io/data/wp-content/uploads/2017/09/michael-dam-258165-300x300.jpg"
                alt=""
                className="img-fluid img-avator me-2"
              />{" "}
            </Link>
            <FaSearch className="fs-4 me-2 icon-navbar-right" />
            <Link to="/">
              <FaSignOutAlt className="fs-4 me-2 icon-navbar-right" />{" "}
            </Link>
            <FaBars className="fs-4 d-md-none icon-navbar-right" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
