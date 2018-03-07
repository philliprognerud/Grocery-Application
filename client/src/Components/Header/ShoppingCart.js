/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

const style = {
  cart: {
    float: "right",
    display: "inline-block",
    marginRight: "200px",
    marginTop: "55px"
  }
};

class ShoppingCart extends Component {
  render() {
    return (
      <div class="ui vertical button" style={style.cart}>
        <i class="shop icon" />
      </div>
    );
  }
}

export default ShoppingCart;
