import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

const InitState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  onProcess: false,
  err: false,
};

export const UserContext = createContext(InitState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, InitState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const LoginProcess = async ({ username, passwrod }) => {
    dispatch({ type: "LogInProcess" });
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        username: username,
        password: passwrod,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3001/api/auth/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          dispatch({ type: "LogSuccess", payload: result.data });
        })
        .catch((error) => dispatch({ type: "LogFailuire" }));
      // console.log(res);
      // if (res.ok) {
      //   dispatch({ type: "LogSuccess", payload: res.data });
      // } else {
      //   dispatch({ type: "LogFailuire" });
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        onProcess: state.onProcess,
        err: state.err,
        LoginProcess,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
