/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import CartSideBar from "./CartSideBar.js";

const style = {
  cart: {
    float: "right"
  },
  icon: {
    margin: "0px"
  },
  label: {
    position: "absolute",
    top: "5.3%",
    paddingLeft: "50px"
  }
};

class CartBtn extends Component {
  constructor(props) {
    super(props);

    this.state = { itemAmount: 0 };

    this.renderCartAmount = this.renderCartAmount.bind(this);
  }

  componentDidUpdate() {
    if (
      this.props.cartAmount &&
      this.props.cartAmount !== this.state.itemAmount
    ) {
      this.setState({ itemAmount: this.props.cartAmount });
    } else if (!this.props.cartAmount && this.state.itemAmount === 1) {
      this.setState({ itemAmount: 0 });
    }
  }

  // Toggles the cart sidebar
  handleClick() {
    $(".ui.sidebar")
      .sidebar("setting", {
        transition: "overlay",
        dimPage: true,
        closable: true
      })
      .sidebar("toggle");
  }

  renderCartAmount() {
    if (this.state.itemAmount !== 0) {
      return <a class="ui label">{this.state.itemAmount}</a>;
    }

    return;
  }

  render() {
    return (
      <div
        className="ui button green"
        style={style.cart}
        onClick={this.handleClick}
      >
        <div class="ui circular orange labels" style={style.label}>
          {this.renderCartAmount()}
        </div>
        <i className="shopping cart icon" style={style.icon} /> Cart
      </div>
    );
  }
}

function mapStateToProps({ cartAmount }) {
  return { cartAmount };
}

export default connect(mapStateToProps)(CartBtn);
