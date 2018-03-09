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
  }
};

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username, this.state.password);

    await axios.post("/auth/local", {
      username: this.state.username,
      password: this.state.password
    });
  }

  handleFacebookAuth(e) {
    let popup = window.open(
      "/auth/facebook",
      "",
      "menubar=1,resizable=1,width=700,height=500"
    );

    var timer = setInterval(function() {
      if (popup.closed) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 1000);
  }

  handleUserChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePwChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div class="ui modal" style={style.modal}>
        <i class="close icon" />
        <div style={style.div}>
          <div class="image centered content">
            <div class="ui medium image" style={style.image}>
              <img
                src={require("../../Images/pickle_logo.png")}
                alt="Pickle Logo"
                style={style.logo}
                draggable="false"
                dragstart="false"
              />
            </div>
          </div>
          <h2 class="ui centered header">
            <div class="content">
              Welcome Back!
              <div class="sub header">Login with your email and password</div>
            </div>
          </h2>
          <form class="ui form" onSubmit={this.handleSubmit}>
            <div class="field">
              <input
                type="text"
                name="username"
                placeholder="Email address or username"
                value={this.state.username}
                onChange={this.handleUserChange}
              />
            </div>
            <div class="field">
              <input
                type="text"
                name="password"
                placeholder="Password (min 6 characters)"
                value={this.state.password}
                onChange={this.handlePwChange}
              />
            </div>
            <button class="ui orange button" type="submit" style={style.btn}>
              Log in
            </button>
            <a href="/auth/logout">Log Out</a>
          </form>
          <div class="ui horizontal divider">Or</div>

          <div class="row">
            <div class="column">
              <button
                class="ui facebook button"
                style={style.btn}
                onClick={this.handleFacebookAuth}
              >
                <i class="facebook icon" />
                Facebook
              </button>
            </div>
            <div class="column">
              <button
                class="ui google plus button"
                style={{ ...style.btn, marginTop: "10px" }}
              >
                <i class="google plus icon" />
                Google Plus
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;
