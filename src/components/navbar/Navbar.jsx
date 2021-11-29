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

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid navbar-container px-5">
          <div>
            <a href="#" className="navbar-brand">
              <FaFacebook className=" icons-nav mx-1 p-0 fs-4" />
            </a>
            <a href="#" className="navbar-brand">
              <FaPinterest className=" icons-nav mx-1 p-0 fs-4" />
            </a>
            <a href="#" className="navbar-brand">
              <FaInstagram className=" icons-nav mx-1 p-0 fs-4" />
            </a>
            <a href="#" className="navbar-brand">
              <FaTwitter className=" icons-nav mx-1 p-0 fs-4" />
            </a>
          </div>
          <div>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="#home" className="nav-link text-uppercase">
                  home
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link text-uppercase">
                  about
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link text-uppercase">
                  contact
                </a>
              </li>
              <li className="nav-item">
                <a href="#write" className="nav-link text-uppercase">
                  write
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center justfy-content-between">
            <img
              src="https://userstock.io/data/wp-content/uploads/2017/09/michael-dam-258165-300x300.jpg"
              alt=""
              className="img-fluid img-avator me-2"
            />
            <FaSearch className="fs-4 me-2 icon-navbar-right" />
            <FaSignOutAlt className="fs-4 me-2 icon-navbar-right" />
            <FaBars className="fs-4 d-md-none icon-navbar-right" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
