/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";

import AddToCart from "./AddToCart";
import GuestModal from "./GuestModal";

const style = {
  desc: {
    color: "#5a5a5a",
    lineHeight: "1.3em",
    marginBottom: "0px",
    maxHeight: "55px",
    overflow: "hidden",
    width: "80%"
  },
  price: {
    marginTop: "15px",
    marginBottom: "0",
    fontSize: "18px",
    fontWeight: "900"
  },
  weight: {
    color: "#999",
    fontSize: "12px",
    fontWeight: "300"
  },
  cartDiv: {
    background: "linear-gradient(to top, white 40%, rgba(0,0,0,0))",
    position: "absolute",
    top: "40%",
    float: "right",
    width: "160px",
    height: "50px",
    display: "none"
  }
};

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = { guestModal: false };
  }

  _handleMouseEnter(e) {
    $(`.${this.props.fadeID}`).transition({
      animation: "fade up",
      duration: 250
    });
  }

  _handleMouseLeave(e) {
    $(`.${this.props.fadeID}`).transition({
      animation: "fade up",
      duration: 120
    });
  }

  async _handleAddToCart(clicked) {
    //Adding to User cart
    this.props.updateUserCart(this.props.itemID);

    //Figure out how to wrap redux in promise
    setTimeout(() => {
      this.props.getUserCart();
    }, 500);
  }

  _handleImage(clicked) {
    // window.location.href = "/test";
  }

  render() {
    return (
      <div
        onMouseEnter={e => this._handleMouseEnter(e)}
        onMouseLeave={e => this._handleMouseLeave(e)}
        style={{
          width: "150px",
          display: "inline-block",
          marginLeft: "15px",
          marginRight: "15px"
        }}
      >
        <div class="ui items" style={{ margin: "0px" }}>
          <div class="image">
            <img
              src={this.props.img}
              href="/test"
              alt="generic grocery"
              draggable="false"
              dragstart="false"
              onClick={e => this._handleImage(e)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div class="item" style={{ margin: "0px", paddingLeft: "10px" }}>
            <div class="content">
              <a class="header">${parseFloat(this.props.price).toFixed(2)}</a>
              <div class="meta">
                <span>{this.props.title}</span>
              </div>
              <div class="extra">
                {parseFloat(this.props.weight).toFixed(1)} oz
              </div>
            </div>
          </div>
        </div>

        <div className={this.props.fadeID} style={style.cartDiv}>
          <AddToCart btnClick={e => this._handleAddToCart(e)} />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Item);
