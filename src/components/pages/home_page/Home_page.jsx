import "./Home_page.css";
import { Link } from "react-router-dom";

const srcs = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/3.jpg"];

export default function Home_page() {
  // const dispalyBackground = async () => {
  //   srcs.map((src) =>
  //     setInterval(() => <img src={process.env.PUBLIC_URL + src} />, 2500)
  //   );
  // };
  // process.env.PUBLIC_URL;
  return (
    <>
      <div className="background">
        <img src={process.env.PUBLIC_URL + "images/1.jpg"} alt="" />
      </div>
      <div className="banner">
        <h1 className="">Tell your Stroy with Us</h1>
        <h2 className="">
          Share your wonderful experient width people around world!
        </h2>
        <Link to="/register" className="banner-btn">
          Sign up Now
        </Link>
      </div>
    </>
  );
}
