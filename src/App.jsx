import "./App.css";
import React from "react";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";

function App() {
  const { authenticate, isAuthenticated, isAuthenticating, logout, Moralis } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("user is logged in");
    }
  }, [isAuthenticated]);

  const login = async (_username, _passwd) => {
    if (!isAuthenticated) {
      const user = await Moralis.User.logIn(_username, _passwd);
      console.log("user logged in: ", user);
    }
  };

  const signUp = async (_username, _passwd, _email) => {
    const user = new Moralis.User();
    user.set("username", _username);
    user.set("password", _passwd);
    user.set("email", _email);

    try {
      await user.signUp();
      console.log("User registered");
    } catch (error) {
      alert("Error: " + error.code + ":" + error.message);
    }
  };

  const logOut = async () => {
    await logout();
    console.log("Logged out");
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Vote Dapp
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={logOut}>Log Out</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login onLogin={login} />} />
              <Route path="/sign-in" element={<Login onLogin={login} />} />
              <Route path="/sign-up" element={<SignUp onSignUp={signUp} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
