/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

// Placeholder links until components are done
const homeLink = "/";
const departLink = "/departments";
const couponsLink = "/coupons";
const itemstLink = "/items";

class MenuBar extends Component {
  render() {
    return (
      <div className="ui attached four item menu">
        <div className="ui container">
          <a className="item" href={homeLink}>
            <i className="home icon" /> Home
          </a>
          <a className="item" href={departLink}>
            <i className="bars icon" /> Departments
          </a>

          <a className="item" href={couponsLink}>
            <i className="gift icon" /> Coupons
          </a>

          <a className="item" href={itemstLink}>
            <i className="list alternate outline icon" /> Your Items
          </a>
        </div>
      </div>
    );
  }
}

export default MenuBar;
