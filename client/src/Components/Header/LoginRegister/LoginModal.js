import React, { Component } from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const style = {
  modal: {
    padding: "25px",
    width: "400px"
  },
  logo: {
    width: "100px",
    margin: "auto"
  },
  image: {
    width: "100%"
  }
};

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: false,
      login: true,
      reset: false
    };

    this.renderSignupForm = this.renderSignupForm.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.signupCallBack = this.signupCallBack.bind(this);
    this.loginCallBack = this.loginCallBack.bind(this);
  }

  signupCallBack(data) {
    this.setState({ signup: data, login: false, reset: false });
  }

  loginCallBack(data) {
    this.setState({ login: data, signup: false, reset: false });
  }

  renderLoginForm() {
    return this.state.login ? (
      <LoginForm onSignupClick={this.signupCallBack} />
    ) : null;
  }

  renderSignupForm() {
    return this.state.signup ? (
      <div>
        <SignupForm onLoginClick={this.loginCallBack} />
      </div>
    ) : null;
  }

  render() {
    return (
      <div className="ui modal" style={style.modal}>
        <i className="close icon" />
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
        {this.renderLoginForm()}
        {this.renderSignupForm()}
      </div>
    );
  }
}

export default LoginModal;

// {this.renderSignupForm}
//         {this.renderResetPwForm}
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
