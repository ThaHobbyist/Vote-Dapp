import React, { Component } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Home = (props) => {
  const user = props.user;
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return <div>This is Home</div>;
};

export default Home;
