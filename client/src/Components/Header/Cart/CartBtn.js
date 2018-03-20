/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import CartSideBar from "./CartSideBar.js";

const style = {
  cart: {
    float: "right"
  }
};

class CartBtn extends Component {
  // Toggles the cart sidebar
  handleClick() {
    $(".ui.sidebar")
      .sidebar("setting", {
        transition: "overlay",
        dimPage: false,
        closable: true
      })
      .sidebar("toggle");
  }

  render() {
    return (
      <div
        className="ui vertical button"
        style={style.cart}
        onClick={this.handleClick}
      >
        <i className="shop icon" />
      </div>
    );
  }
}

export default CartBtn;
