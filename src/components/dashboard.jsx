import React, { Component } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Dashboard = (props) => {
  const user = props.user;
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return <div>This is Dashboard</div>;
};

export default Dashboard;
