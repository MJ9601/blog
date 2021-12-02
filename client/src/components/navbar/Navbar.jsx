import "./Navbar.css";
import {
  FaBars,
  FaCog,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ User, setUser }) => {
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
            <ul className={User ? "navbar-nav me-3 mb-2 mb-lg-0" : "d-none"}>
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
            <ul className={!User ? "navbar-nav me-3 mb-2 mb-lg-0" : "d-none"}>
              <li className="nav-item">
                <Link
                  to="/"
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
            </ul>
            <Link to="/:userName/profile">
              <img
                src="https://userstock.io/data/wp-content/uploads/2017/09/michael-dam-258165-300x300.jpg"
                alt=""
                className={!User ? "d-none" : "img-fluid img-avator me-3"}
              />{" "}
            </Link>
            <FaSearch className="fs-4 me-3 icon-navbar-right" />
            <Link to="/:userName/setting">
              <FaCog
                className={!User ? "d-none" : "fs-4 me-3 icon-navbar-right"}
              />{" "}
            </Link>
            {!User ? (
              <Link to="/login">
                <FaSignInAlt className="fs-4 me-3 icon-navbar-right " />
              </Link>
            ) : (
              <Link to="/">
                <FaSignOutAlt
                  className="fs-4 me-3 icon-navbar-right"
                  onClick={() => setUser(false)}
                />
              </Link>
            )}

            <FaBars className="fs-4 d-md-none icon-navbar-right" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
