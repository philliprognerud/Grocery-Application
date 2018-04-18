/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import { connect } from "react-redux";

const Account = "/accountmenu/account";
const OrderHistory = "/accountmenu/orderhistory/";

const style = {
  div: {
    display: "inline-block",
    float: "left",
    marginTop: "56px",
    boxShadow: "0px 1px 1px #4d4d4d"
  }
};

class AccountDropDown extends Component {
  constructor(props) {
    super(props);

    this.renderDropDown = this.renderDropDown.bind(this);
  }

  componentDidUpdate() {
    $(".ui.dropdown.button").dropdown();
  }

  renderDropDown() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return null;

      default:
        return (
          <div className="ui dropdown button">
            <span className="text">Account</span>
            <i className="dropdown icon" />

            <div className="menu">
              <div className="header">
                <h3>Hi, Pickle User</h3>
              </div>
              <div className="divider" />

              <div className="item">
                <i className="user icon" />
                <a href={Account}>Settings</a>
              </div>
              <div className="item">
                <i className="list alternate outline icon" />
                <a href={OrderHistory}>Orders</a>
              </div>
              <div className="divider" />
              <div className="item">
                <i className="sign out icon" />
                <a href="/auth/logout">Sign Out</a>
              </div>
            </div>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="dropContainer" style={style.div}>
        {this.renderDropDown()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AccountDropDown);
