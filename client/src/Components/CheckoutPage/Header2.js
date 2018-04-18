/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

import Logo from "../Header/Logo";

const style = {
  logo: {
    width: "60px",
    display: "block",
    margin: "12px"
  }
};

class Header2 extends Component {
  _handleMouseEnter(e) {
    setInterval(function() {
      $(".pickle.rick")
        .transition({
          animation: "fly left",
          duration: 2000,
          interval: 0
        })
        .transition({
          animation: "fly right",
          duration: 2000,
          interval: 0
        });
    }, 500);
  }

  render() {
    return (
      <div class="ui top menu">
        <a
          href="/"
          style={{ margin: "auto" }}
          onMouseEnter={e => this._handleMouseEnter(e)}
        >
          <img
            className="pickle rick"
            style={style.logo}
            src={require("../../Images/pickle_logo.png")}
            alt="Pickle Logo"
          />
        </a>
      </div>
    );
  }
}

export default Header2;
