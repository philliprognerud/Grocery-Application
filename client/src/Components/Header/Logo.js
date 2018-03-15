/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

const style = {
  logo: {
    width: "50px",
    display: "inline-block",
    marginTop: "25px"
  },
  header: {
    display: "inline-block"
  },
  div: {
    float: "left",
    marginLeft: "16%"
  }
};

class Logo extends Component {
  render() {
    return (
      <div>
        <div style={style.div}>
          <a href="/">
            <img
              style={style.logo}
              src={require("../../Images/pickle_logo.png")}
              alt="Pickle Logo"
            />
            <h1 style={style.header} className="ui header">
              Pickle
            </h1>
          </a>
        </div>
      </div>
    );
  }
}

export default Logo;
