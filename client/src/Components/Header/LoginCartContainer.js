import React, { Component } from "react";

import LoginBtn from "./LoginRegister/LoginBtn";
import AccountDropDown from "./LoginRegister/AccountDropDown";
import CartBtn from "./Cart/CartBtn";

const style = {
  container: {
    float: "right",
    marginTop: "57px",
    marginRight: "16%",
    width: "200px"
  }
};

class LoginCartContainer extends Component {
  render() {
    return (
      <div style={style.container}>
        <CartBtn />
        <LoginBtn />
        <AccountDropDown />
      </div>
    );
  }
}

export default LoginCartContainer;
