/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const style = {
  cartHeader: {
    margin: "0px",
    width: "150px",
    display: "inline-block",
    float: "left"
  },
  closeBtn: {
    float: "right"
  },
  headerRow: {
    marginBottom: "15px"
  },
  checkoutBtn: {
    height: "50px"
  },
  itemContainer: {
    position: "fixed",
    top: "10%",
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%"
  },
  totalLabel: {
    position: "fixed",
    right: "4%",
    bottom: "1.9%",
    opacity: "0.90"
  }
};

class CartSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = { cart: [], inputs: [] };

    this.renderCartItems = this.renderCartItems.bind(this);
    this.renderTotalAmount = this.renderTotalAmount.bind(this);
  }

  async componentDidUpdate() {
    if (this.props.cart && !_.isEqual(this.props.cart, this.state.cart)) {
      //Updating the inputs of the added items
      let tempInputs = this.props.cart.map(item => {
        return item.quantity;
      });

      //Remove bottom css style when items go below 10
      let style = document.querySelector(".ui.itemContainer").style.bottom;
      if (this.props.cart.length < 10 && style) {
        document.querySelector(".ui.itemContainer").style.bottom = "";
      }

      this.setState({ cart: this.props.cart, inputs: tempInputs });
    }
  }

  handleCloseClick() {
    $(".ui.sidebar").sidebar("toggle");
  }

  _handleInputChange(index, e) {
    let itemCount = String(e.target.value || "0");

    let temp = this.state.inputs.slice();

    //If greater than 99 then set to 99
    if (parseInt(itemCount, 10) >= 100) {
      itemCount = "99";
    }

    //If "0" then set without parseInt
    if (itemCount === "0") {
      temp[index] = itemCount;
    } else {
      temp[index] = parseInt(itemCount, 10);
    }

    this.setState({ inputs: temp });
  }

  async _handleInputBlur(id, e) {
    let itemCount = e.target.value;

    let item = this.state.cart.find(entry => entry.product._id === id);

    if (parseInt(item.quantity, 10) !== parseInt(itemCount, 10)) {
      if (itemCount === "0") {
        //Fade out the row
        $(`.row.${id}`).transition("fade left");
      }

      //Update the count in User schema cart
      await axios.post("/api/update-item-quantity", {
        quantity: itemCount,
        itemID: id
      });

      //Retrieve cart information
      this.props.getUserCart();

      setTimeout(() => {
        //Get length of cart for CartBtn
        this.props.updateUserCart();
      }, 500);
    }
  }

  async _handleDelete(id, e) {
    //Stop additional event triggers

    $(`.row.${id}`).transition("fade left");

    await axios.post("/api/update-item-quantity", {
      quantity: "0",
      itemID: id
    });

    this.props.getUserCart();

    setTimeout(() => {
      //Get length of cart for CartBtn
      this.props.updateUserCart();
    }, 500);
  }

  renderTotalAmount() {
    return this.state.cart
      .map((item, index) => {
        if (item.product.tags.includes("sale")) {
          item.product.price = (item.product.price / 2).toFixed(2);
        }
        return parseFloat(item.product.price) * parseFloat(item.quantity);
      })
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
  }

  renderCartItems() {
    switch (this.state.cart) {
      case null:
        return;
      default:
        return this.state.cart.map((item, index) => {
          if (index === 10) {
            document.querySelector(".ui.itemContainer").style.bottom = "10%";
          }
          return (
            <div className={`row ${item.product._id}`} key={index}>
              <div class="three wide column">
                <img
                  class="ui small image"
                  src={item.product.image}
                  alt={item.product.name}
                />
              </div>
              <div
                class="six wide column"
                style={{
                  marginTop: "15px",
                  padding: "0px",
                  textAlign: "left",
                  paddingLeft: "15px"
                }}
              >
                {item.product.name}
              </div>
              <div
                class="two wide column"
                style={{ marginTop: "10px", padding: "0px" }}
              >
                <div class="ui input" style={{ width: "40px" }}>
                  <input
                    type="text"
                    value={
                      this.state.inputs[index]
                        ? this.state.inputs[index]
                        : item.quantity
                    }
                    onChange={e => this._handleInputChange(index, e)}
                    onBlur={e => this._handleInputBlur(item.product._id, e)}
                    style={{ padding: "8px", textAlign: "center" }}
                  />
                </div>
              </div>
              <div
                class="three wide column"
                style={{ marginTop: "15px", padding: "0px" }}
              >
                ${item.product.tags.includes("sale")
                  ? (item.product.price / 2).toFixed(2)
                  : item.product.price}
              </div>
              <div
                class="two wide column"
                style={{ marginTop: "15px", padding: "0px" }}
              >
                <i
                  className="trash alternate outline icon large"
                  style={{ cursor: "pointer" }}
                  onClick={e => this._handleDelete(item.product._id, e)}
                />
              </div>
            </div>
          );
        });
    }
  }

  render() {
    return (
      <div className="ui very wide right vertical menu sidebar">
        <div class="ui equal width center aligned padded grid">
          <div class="row" style={style.headerRow}>
            <div class="green column">
              <h2 class="ui inverted header" style={style.cartHeader}>
                <div class="content">Personal Cart</div>
              </h2>
              <button
                className="tiny ui orange button"
                style={style.closeBtn}
                onClick={this.handleCloseClick}
              >
                <i className="times icon" />
                Close
              </button>
            </div>
          </div>

          <div
            class="ui equal width center aligned padded grid itemContainer"
            style={style.itemContainer}
          >
            {this.renderCartItems()}
          </div>

          <div
            className="row"
            style={{
              position: "fixed",
              bottom: "0",
              background: "white"
            }}
          >
            <div class="sixteen wide column">
              <button
                class="fluid ui orange button"
                style={style.checkoutBtn}
                onClick={e => {
                  if (this.state.cart.length > 0)
                    window.location.href = "/checkout";
                }}
              >
                Checkout
                <div class="ui huge label" style={style.totalLabel}>
                  ${this.renderTotalAmount()}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ cart }) {
  return { cart };
}

export default connect(mapStateToProps, actions)(CartSideBar);
