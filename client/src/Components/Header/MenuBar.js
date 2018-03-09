/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

// Placeholder links until components are done
const homeLink = "/";
const departLink = "/departments";
const couponsLink = "/coupons";
const recentLink = "/recent";
const listsLink = "/lists";
const savedLink = "/saved";

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
          <div className="ui simple dropdown item">
            Your Items
            <i className="dropdown icon" />
            <div className="menu">
              <a className="item" href={recentLink}>
                <i className="truck icon" /> Recent Orders
              </a>
              <a className="item" href={listsLink}>
                <i className="archive icon" /> Lists
              </a>
              <a className="item" href={savedLink}>
                <i className="star icon" /> Saved
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuBar;
