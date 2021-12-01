import { FaBars, FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./NavbarUnregistered.css";
import { Link } from "react-router-dom";

export default function NavbarUnregistered() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid navbar-container px-5">
          <div>
            <a href="#" className="navbar-brand fs-4 fw-bold brand">
              Blog<span className="brand">Away</span>
            </a>
          </div>
          <div></div>
          <div className="d-flex align-items-center justfy-content-between">
            <FaSearch className="fs-4 me-2 icon-navbar-right " />
            <Link to="/login">
              <FaSignInAlt className="fs-4 me-2 icon-navbar-right " />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
