import "./App.css";
import React from "react";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Error from "./components/error";

function App() {
  let navigate = useNavigate();

  const { Moralis, user } = useMoralis();

  useEffect(() => {
    if (user) {
      console.log("user is logged in", user);
    } else {
      console.log("user is logged out", user);
    }
  }, [user]);

  const login = async (_username, _passwd) => {
    const _user = await Moralis.User.logIn(_username, _passwd);
    console.log("user just logged in: ", _user);
    navigate("/dashboard");
  };

  const signUp = async (_username, _passwd, _email) => {
    const _user = new Moralis.User();
    _user.set("username", _username);
    _user.set("password", _passwd);
    _user.set("email", _email);

    try {
      await _user.signUp();
      console.log("User registered");
    } catch (error) {
      alert("Error: " + error.code + ":" + error.message);
    }
  };

  const logOut = async () => {
    await Moralis.User.logOut();
    navigate("/");
    console.log("Logged out");
  };

  const notLoginDisplay = () => {
    let _class = "nav-item ";
    _class += user === null ? "inline-block" : "d-none";
    return _class;
  };

  const loginDisplay = () => {
    let _class = "nav-item ";
    _class += user === null ? "d-none" : "inline-block";
    return _class;
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            Vote Dapp
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className={notLoginDisplay()}>
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>
              </li>
              <li className={notLoginDisplay()}>
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
              <li className={loginDisplay()}>
                <button onClick={logOut}>Log Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/sign-in"
              element={<Login onLogin={login} user={user} />}
            />
            <Route
              path="/sign-up"
              element={<SignUp onSignUp={signUp} user={user} />}
            />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
