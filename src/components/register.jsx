import React, { Component } from "react";

class register extends Component {
  state = {
    username: "",
    email: "",
    passwd: "",
  };

  constructor(props) {
    super(props);

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePasswd = this.handlePasswd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswd(event) {
    this.setState({ passwd: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSignUp(
      this.state.username,
      this.state.passwd,
      this.state.email
    );
    this.setState({ username: "", passwd: "", email: "" });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsername}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleEmail}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.passwd}
            onChange={this.handlePasswd}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}

export default register;
