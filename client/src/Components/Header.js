/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <button className="ui primary button">Save</button>
        <button className="ui button">Discard</button>
      </div>
    );
  }
}

export default Header;
