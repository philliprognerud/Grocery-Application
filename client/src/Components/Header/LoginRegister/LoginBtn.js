/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import LoginModal from "./LoginModal";
import { connect } from "react-redux";

const style = {
  btn: {},
  div: {
    marginTop: "56px",
    display: "inline-block",
    float: "left",
    marginLeft: "15px",
    boxShadow: "0px 1px 1px #4d4d4d"
  }
};

class LoginBtn extends Component {
  constructor(props) {
    super(props);

    this.renderLoginBtn = this.renderLoginBtn.bind(this);
  }

  handleClick() {
    $(".ui.modal").modal("show");
  }

  renderLoginBtn() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <button
            className="ui button"
            onClick={this.handleClick}
            style={style.btn}
          >
            Login
          </button>
        );
      default:
        return;
    }
  }

  render() {
    return (
      <div style={style.div}>
        {this.renderLoginBtn()}
        <LoginModal />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(LoginBtn);
