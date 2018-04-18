import React, { Component } from "react";
import { connect } from "react-redux";

import LoginBtn from "./LoginRegister/LoginBtn";
import AccountDropDown from "./LoginRegister/AccountDropDown";
import CartBtn from "./Cart/CartBtn";

const style = {
  container: {}
};

class LoginCartContainer extends Component {
  render() {
    return (
      <div
        className="login cart"
        style={{
          ...style.container
        }}
      >
        <CartBtn />
        <LoginBtn />
        <AccountDropDown />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(LoginCartContainer);
