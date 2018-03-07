/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import LoginModal from "./LoginModal";

const style = {
  btn: {
    display: "inline-block",
    marginRight: "35px",
    marginTop: "65px"
  },
  div: {
    float: "right"
  }
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    $(".ui.modal").modal("show");
  }

  render() {
    return (
      <div style={style.div}>
        <button
          style={style.btn}
          className="ui green button"
          onClick={this.handleClick}
        >
          Login
        </button>
        <LoginModal />
      </div>
    );
  }
}

export default Login;
