/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

// Placeholder links until components are done
const homeLink = "/";
const departLink = "/departments";
const couponsLink = "/departments/sale";
const itemstLink = "/items";

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = { home: "", department: "", coupons: "", items: "" };
  }

  componentDidMount() {
    let path = window.location.pathname;

    if (path === "/") {
      this.setState({ home: "active", department: "", coupons: "", items: "" });
    } else if (path === "/departments") {
      this.setState({ home: "", department: "active", coupons: "", items: "" });
    } else if (path === "/departments/sale") {
      this.setState({ home: "", department: "", coupons: "active", items: "" });
    } else if (path === "/items") {
      this.setState({ home: "", department: "", coupons: "", items: "active" });
    }
  }

  _handleHomeClick(e) {
    this.setState({ home: "active", department: "", coupons: "", items: "" });
  }

  _handleDepartmentClick(e) {
    this.setState({ home: "", department: "active", coupons: "", items: "" });
  }

  _handleCouponClick(e) {
    this.setState({ home: "", department: "", coupons: "active", items: "" });
  }

  _handleItemsClick(e) {
    this.setState({ home: "", department: "", coupons: "", items: "active" });
  }

  render() {
    return (
      <div className="ui attached four item  menu">
        <div className="ui container">
          <a
            className={`${this.state.home} item`}
            href={homeLink}
            onClick={e => this._handleHomeClick(e)}
          >
            <i className="home icon" /> Home
          </a>
          <a
            className={`${this.state.department} item`}
            href={departLink}
            onClick={e => this._handleDepartmentClick(e)}
          >
            <i className="bars icon" /> Departments
          </a>

          <a
            className={`${this.state.coupons} item`}
            href={couponsLink}
            onClick={e => this._handleCouponClick(e)}
          >
            <i className="gift icon" /> Sales
          </a>

          <a
            className={`${this.state.items} item`}
            href={itemstLink}
            onClick={e => this._handleItemsClick(e)}
          >
            <i className="list alternate outline icon" /> Your Items
          </a>
        </div>
      </div>
    );
  }
}

export default MenuBar;
