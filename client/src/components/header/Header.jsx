import "./Header.css";
import Bg from "./back-1.jpg";
const Header = () => {
  return (
    <header className="w-100">
      <div className=" img-wrapper">
        <img src={Bg} alt="" className="avator-bg" />
        <div className="avator-wrapper">
          <img
            src="https://userstock.io/data/wp-content/uploads/2017/09/michael-dam-258165-300x300.jpg"
            alt=""
            className="avator-img"
          />
          <div className="info">
            <h1 className=" name-tag">Jane Doe</h1>
            <h3 className="prefasion-tag">Web Designer & Web Developer</h3>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
