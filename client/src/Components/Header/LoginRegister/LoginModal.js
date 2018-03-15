import React, { Component } from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const style = {
  modal: {
    padding: "25px",
    width: "400px"
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
      <SignupForm onLoginClick={this.loginCallBack} />
    ) : null;
  }

  render() {
    return (
      <div className="ui modal" style={style.modal}>
        <i className="close icon" />
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
