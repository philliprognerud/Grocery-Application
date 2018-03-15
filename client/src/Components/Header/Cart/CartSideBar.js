/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";

const style = {
  cartHeader: {},
  itemList: {
    paddingTop: "2%"
  },
  checkout: {
    paddingTop: "5%"
  },
  checkoutBtn: {
    width: "55%",
    marginLeft: "12%"
  }
};

class CartSideBar extends Component {
  handleCloseClick() {
    $(".ui.sidebar").sidebar("toggle");
  }

  render() {
    return (
      <div>
        <div className="ui very wide right vertical menu sidebar">
          <div>
            <button
              className="mini ui red basic button"
              onClick={this.handleCloseClick}
            >
              Close
            </button>
          </div>
          <h2 className="ui centered header">Shopping Cart</h2>
          <div>
            <h2 className="ui center aligned sub header">
              Shipped to: Wherever
            </h2>
          </div>
          <div className="itemList" style={style.itemList}>
            <a className="item">Item 1</a>
            <a className="item">Item 2</a>
            <a className="item">Item 3</a>
          </div>
          <div className="ui left action input" style={style.checkout}>
            <button
              className="fluid ui green labeled icon button"
              style={style.checkoutBtn}
            >
              <i className="cart icon" />
              Checkout
            </button>
            <input type="text" />
          </div>
        </div>
      </div>
    );
  }
}

export default CartSideBar;
