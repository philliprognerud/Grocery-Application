/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import axios from "axios";

const style = {
  logo: {
    width: "100px",
    margin: "auto"
  },
  div: {
    margin: "auto",
    width: "275px",
    userSelect: "none"
  },
  image: {
    width: "100%"
  },
  btn: {
    width: "100%"
  },
  a: {
    cursor: "pointer",
    marginLeft: "7px"
  },
  loader: {
    float: "left"
  },
  loaderDiv: {
    padding: "15px"
  }
};

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
      zipCode: "",
      tos: false,
      error: false,
      accountCreated: false,
      usernameTaken: false,
      emailTaken: false,
      errorMessage: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.repeatPwChange = this.repeatPwChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.zipCodeChange = this.zipCodeChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  componentDidMount() {
    let input = document.querySelectorAll(".formInput");
    input.forEach(elem => {
      elem.setAttribute("autoComplete", "off");
    });

    $(".ui.checkbox").checkbox();
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      this.state.username &&
      this.state.password === this.state.passwordRepeat &&
      this.state.email &&
      this.state.zipCode &&
      this.state.tos
    ) {
      const newUser = await axios.post("/auth/signup", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        zipCode: this.state.zipCode
      });

      this.setState({
        usernameTaken: newUser.data.usernameTaken,
        emailTaken: newUser.data.emailTaken,
        accountCreated: newUser.data.accountCreated,
        error: false
      });

      if (this.state.usernameTaken) {
        this.setState({
          error: true,
          errorMessage: "USERNAME is already taken."
        });
      } else if (this.state.emailTaken) {
        this.setState({ error: true, errorMessage: "EMAIL is already taken." });
      }

      if (this.state.accountCreated) {
        await axios.post("/auth/login", {
          username: this.state.username,
          password: this.state.password
        });

        setTimeout(function() {
          window.location.href = "/";
        }, 1000);
      }
    } else {
      this.setState({
        error: true,
        errorMessage: "Please enter your information again."
      });
    }
  }

  handleCheckBox() {
    this.setState({ tos: !this.state.tos });
  }

  handleLogin() {
    this.props.onLoginClick(true);
  }

  usernameChange(e) {
    this.setState({ username: e.target.value });
  }

  passwordChange(e) {
    this.setState({ password: e.target.value });
  }

  repeatPwChange(e) {
    this.setState({ passwordRepeat: e.target.value });
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  zipCodeChange(e) {
    this.setState({ zipCode: e.target.value });
  }

  render() {
    return (
      <div style={style.div}>
        <div className="image centered content">
          <div className="ui medium image" style={style.image}>
            <img
              src={require("../../../Images/pickle_logo.png")}
              alt="Pickle Logo"
              style={style.logo}
              draggable="false"
              dragstart="false"
            />
          </div>
        </div>
        <h2 className="ui centered header">
          <div className="content">
            Registration!
            <div className="sub header">Please enter your information.</div>
          </div>
        </h2>

        <div
          className="ui negative message"
          style={{ display: this.state.error ? "block" : "none" }}
        >
          <p>{this.state.errorMessage}</p>
        </div>

        <div
          className="ui icon success message"
          style={{
            ...style.loaderDiv,
            display: this.state.accountCreated ? "block" : "none"
          }}
        >
          <i className="notched circle loading icon" style={style.loader} />
          <div className="content">
            <div className="header">Success</div>
            <p>Logging you in, one moment.</p>
          </div>
        </div>

        <form
          className="ui form"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <div className="field focus">
            <label>Username</label>
            <input
              className="formInput"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.usernameChange}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className="formInput"
              type="text"
              name="password"
              placeholder="Password (min 6 characters)"
              value={this.state.password}
              onChange={this.passwordChange}
            />
            <input
              className="formInput"
              type="text"
              name="passwordRepeat"
              placeholder="Repeat Password"
              style={{ marginTop: "5px" }}
              value={this.state.passwordRepeat}
              onChange={this.repeatPwChange}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              className="formInput"
              type="text"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.emailChange}
            />
          </div>

          <div className="field">
            <label>Zip Code</label>
            <input
              className="formInput"
              type="text"
              placeholder="Zip Code"
              value={this.state.zipCode}
              onChange={this.zipCodeChange}
            />
          </div>

          <div class="required inline field">
            <div class="ui checkbox" onClick={this.handleCheckBox}>
              <input type="checkbox" tabIndex="0" />
              <label>I agree to the terms and conditions</label>
            </div>
          </div>

          <button
            className="ui orange button"
            type="submit"
            style={style.btn}
            onSubmit={this.handleSubmit}
          >
            Register
          </button>

          <h2 className="ui centered header">
            <div className="content">
              <div className="sub header">
                Already have an account?
                <a onClick={this.handleLogin} style={style.a}>
                  Log In
                </a>
              </div>
            </div>
          </h2>
        </form>
      </div>
    );
  }
}

export default SignupForm;
