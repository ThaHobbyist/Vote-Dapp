import React, { Component } from "react";
import { Navigate } from "react-router";
class Login extends Component {
  state = {
    username: "",
    passwd: "",
    user: null,
  };

  componentDidMount() {
    const _user = this.props.user;
    if (_user) {
      Navigate("/");
    }
    this.setState({ user: _user });
  }

  constructor(props) {
    super(props);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePasswd = this.handleChangePasswd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePasswd(event) {
    this.setState({ passwd: event.target.value });
  }

  handleSubmit(event) {
    this.props.onLogin(this.state.username, this.state.passwd);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Log In</h3>

        <div className="mb-3">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            value={this.state.username}
            onChange={this.handleChangeEmail}
            placeholder="Enter username"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={this.state.passwd}
            onChange={this.handleChangePasswd}
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Log-In
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}

export default Login;
