import "./Login.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserState";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, LoginProcess } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginProcess(username, password);
  };
  return (
    <>
      <div className="login">
        <div className="bg-login">
          <img src={process.env.PUBLIC_URL + "images/2.jpg"} alt="" />
        </div>
        <div className="login-wrapper">
          <h1 className="login-banner">Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName" className="labelTag">
                Username:
              </label>
              <input
                type="text"
                id="userName"
                className="inputTag"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="passWord" className="labelTag">
                Password:
              </label>
              <input
                type="password"
                id="passWord"
                className="inputTag"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input type="submit" value="Sign in" className="signIn-btn" />
              <input type="checkbox" className="checkBox" />
              <label htmlFor="">Remember me</label>
              <h4 className="mt-3 login-h4">
                <a href="#">Forget your Password?</a>
              </h4>
              <h4 className="">
                Don't have an account? <Link to="/register"> Sign up </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
