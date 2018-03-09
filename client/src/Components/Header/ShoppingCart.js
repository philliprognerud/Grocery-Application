/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import CartSideBar from "./CartSideBar.js";

const style = {
  cart: {
    float: "right",
    display: "inline-block",
    marginRight: "15%",
    marginTop: "57px"
  }
};

class ShoppingCart extends Component {
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
      <div class="ui vertical button" style={style.cart}>
        <i class="shop icon" onClick={this.handleClick} />
      </div>
    );
  }
}

export default ShoppingCart;
