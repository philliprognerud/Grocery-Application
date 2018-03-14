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
  modal: {
    padding: "25px",
    width: "400px"
  },
  btn: {
    width: "100%"
  },
  loader: {
    float: "left"
  },
  loaderDiv: {
    padding: "15px"
  }
};

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      failureLogin: false,
      successLogin: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
  }

  componentDidMount() {
    let input = document.querySelectorAll(".formInput");
    input.forEach(elem => {
      elem.setAttribute("autocomplete", "off");
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username, this.state.password);

    const userLogin = await axios.post("/auth/login", {
      username: this.state.username,
      password: this.state.password
    });

    this.setState({
      failureLogin: userLogin.data.success ? false : true,
      successLogin: userLogin.data.success ? false : true
    });

    if (!this.state.failureLogin) {
      setTimeout(function() {
        window.location.href = "/";
      }, 1000);
    }
  }

  handleSocialAuth(e) {
    if (e.target.name === "facebook") {
      window.location.href = "/auth/facebook";
    } else if (e.target.name === "google") {
      window.location.href = "/auth/google";
    }
  }

  handleUserChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePwChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="ui modal" style={style.modal}>
        <i className="close icon" />
        <div style={style.div}>
          <div className="image centered content">
            <div className="ui medium image" style={style.image}>
              <img
                src={require("../../Images/pickle_logo.png")}
                alt="Pickle Logo"
                style={style.logo}
                draggable="false"
                dragstart="false"
              />
            </div>
          </div>
          <h2 className="ui centered header">
            <div className="content">
              Welcome Back!
              <div className="sub header">
                Login with your email and password
              </div>
            </div>
          </h2>
          <div
            className="ui negative message"
            style={{ display: this.state.failureLogin ? "block" : "none" }}
          >
            <p>Username or password is incorrect</p>
          </div>

          <div
            className="ui icon success message"
            style={{
              ...style.loaderDiv,
              display: this.state.successLogin ? "none" : "block"
            }}
          >
            <i className="notched circle loading icon" style={style.loader} />
            <div className="content">
              <div className="header">Success</div>
              <p>Logging you in, one moment.</p>
            </div>
          </div>

          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <input
                className="formInput"
                type="text"
                name="username"
                placeholder="Email address or username"
                value={this.state.username}
                onChange={this.handleUserChange}
              />
            </div>
            <div className="field">
              <input
                className="formInput"
                type="text"
                name="password"
                placeholder="Password (min 6 characters)"
                value={this.state.password}
                onChange={this.handlePwChange}
              />
            </div>
            <button
              className="ui orange button"
              type="submit"
              style={style.btn}
            >
              Log in
            </button>
          </form>
          <div className="ui horizontal divider">Or</div>

          <div className="row">
            <div className="column">
              <button
                className="ui facebook button"
                style={style.btn}
                onClick={this.handleSocialAuth}
                name="facebook"
              >
                <i className="facebook icon" />
                Facebook
              </button>
            </div>
            <div className="column">
              <button
                className="ui google plus button"
                style={{ ...style.btn, marginTop: "10px" }}
                onClick={this.handleSocialAuth}
                name="google"
              >
                <i className="google plus icon" />
                Google Plus
              </button>
            </div>
          </div>

          <h2 className="ui centered header">
            <div className="content">
              <div className="sub header">
                Don't have an account?
                <a> Sign up</a>
              </div>
              <div className="sub header">
                Forgot your password?
                <a> Reset it</a>
              </div>
            </div>
          </h2>

          <a href="/auth/logout">Log Out</a>
        </div>
      </div>
    );
  }
}

export default LoginModal;

// let popup = window.open(
//   "/auth/facebook",
//   "popup",
//   "menubar=1,resizable=1,width=700,height=500"
// );

// var timer = setInterval(function() {
//   // if(this.props.auth){
//   //   popup.close();
//   // }
//   if (popup.closed) {
//     clearInterval(timer);
//     window.location.reload();
//   }
// }, 1000);
