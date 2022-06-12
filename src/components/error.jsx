import React, { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {
  render() {
    return (
      <div>
        Error 404: Page not found
        <Link to="/">Return to home</Link>
      </div>
    );
  }
}

export default Error;
