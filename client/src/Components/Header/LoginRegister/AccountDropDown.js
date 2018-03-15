/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import { connect } from "react-redux";

const style = {
  div: {
    float: "right"
  }
};

class AccountDropDown extends Component {
  constructor(props) {
    super(props);

    this.renderDropDown = this.renderDropDown.bind(this);
  }

  componentDidMount() {
    setTimeout(function() {
      $(".ui.dropdown").dropdown();
    }, 400);
  }

  renderDropDown() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return null;

      default:
        return (
          <div class="ui dropdown button">
            <span class="text">Account</span>
            <i class="dropdown icon" />

            <div class="menu">
              <div class="header">
                <h3>Hi, Pickle User</h3>
              </div>
              <div class="divider" />

              <div class="item">
                <i class="user icon" />
                Your Account
              </div>
              <div class="item">
                <i class="list alternate outline icon" />
                Your Orders
              </div>
              <div class="divider" />
              <div class="item">
                <i class="sign out icon" />
                <a href="/auth/logout">Sign Out</a>
              </div>
            </div>
          </div>
        );
    }
  }

  render() {
    return <div style={style.div}>{this.renderDropDown()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AccountDropDown);
