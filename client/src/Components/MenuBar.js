/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from 'react';

// Placeholder links until components are done
const homeLink = "/shawn/test";
const departLink = "/shawn/departments";
const couponsLink = "/shawn/coupons";
const recentLink = "/shawn/recent";
const listsLink = "/shawn/lists";
const savedLink = "/shawn/saved";

class MenuBar extends Component {
    render() {
        return (
        <div className="ui attached stackable menu">
          <div className="ui container">
            <a className="item" href={homeLink}>
              <i className="home icon"></i> Home
            </a>
            <a className="item" href={departLink}>
              <i className="bars icon"></i> Departments
            </a>
            <div className="right menu">
                <a className="item" href={couponsLink}>
                  <i className="gift icon"></i> Coupons
                </a>
                <div className="ui simple dropdown item">
                  Your Items
                  <i className="dropdown icon"></i>
                  <div className="menu">
                    <a className="item" href={recentLink}><i className="truck icon"></i> Recent Orders</a>
                    <a className="item" href={listsLink}><i className="archive icon"></i> Lists</a>
                    <a className="item" href={savedLink}><i className="star icon"></i> Saved</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
        );
    }
}

export default MenuBar