import React, { Component } from "react";

const style = {
  logo: {
    width: "100px",
    margin: "auto"
  },
  div: {
    margin: "auto",
    width: "275px"
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
  render() {
    return (
      <div class="ui modal" style={style.modal}>
        <i class="close icon" />
        <div style={style.div}>
          <div class="image centered content">
            <div class="ui medium image" style={style.image}>
              <img
                src={require("../Images/pickle_logo.png")}
                alt="Pickle Logo"
                style={style.logo}
              />
            </div>
          </div>
          <h2 class="ui centered header">
            <div class="content">
              Welcome Back!
              <div class="sub header">Login with your email and password</div>
            </div>
          </h2>
          <form class="ui form">
            <div class="field">
              <input
                type="text"
                name="first-name"
                placeholder="Email address or username"
              />
            </div>
            <div class="field">
              <input
                type="text"
                name="last-name"
                placeholder="Password (min 6 characters)"
              />
            </div>
            <button class="ui orange button" type="submit" style={style.btn}>
              Log in
            </button>
          </form>
          <div class="ui horizontal divider">Or</div>

          <div class="row">
            <div class="column">
              <button class="ui facebook button" style={style.btn}>
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
