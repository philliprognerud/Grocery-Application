import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { connect } from "react-redux";
import * as actions from "../../actions";

class ConfirmOrder extends Component {
  constructor(props) {
    super(props);

    this.state = { cart: [], totalAmount: 0, couponCode: "", discount: 1 };

    this.renderCartDetails = this.renderCartDetails.bind(this);
  }

  componentWillMount() {
    this.props.getUserCart();
  }

  componentDidUpdate() {
    if (this.props.cart && !_.isEqual(this.props.cart, this.state.cart)) {
      let total = this.props.cart
        .map((item, index) => {
          if (item.product.tags.includes("sale")) {
            item.product.price = (item.product.price / 2).toFixed(2);
          }
          return parseFloat(item.product.price) * parseFloat(item.quantity);
        })
        .reduce((a, b) => a + b, 0)
        .toFixed(2);

      this.setState({ cart: this.props.cart, totalAmount: total });
    }
  }

  async _handlePaymentAuth(e) {
    if (this.props.paymentType === "PayPal") {
      let res = await axios.post("/auth/checkout", {
        cart: this.state.cart,
        discount: this.state.discount
      });

      window.location.href = res.data;
    } else {
      console.log("before await execute");

      let res = await axios.post("/auth/checkout-cc", {
        cart: this.state.cart,
        discount: this.state.discount
      });

      console.log("after await execute");
      console.log(res.data);

      window.location.href = res.data;
    }
  }

  _handleCouponChange(e) {
    this.setState({ couponCode: e.target.value });
  }

  _handleCouponCode(e) {
    //Implement this in the backend
    let discount = 0.1;
    let newTotal = this.state.totalAmount * discount;

    this.setState({ totalAmount: newTotal.toFixed(2), discount: discount });
  }

  renderCartDetails() {
    if (this.state.cart.length > 0) {
      return this.state.cart.map((item, index) => {
        return (
          <div
            className="row"
            key={index}
            style={{ padding: "0px", marginBottom: "10px" }}
          >
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
              style={{
                marginTop: "15px",
                padding: "0px",
                textAlign: "left",
                paddingLeft: "15px"
              }}
            >
              x{item.quantity}
            </div>

            <div
              class="three wide column"
              style={{
                marginTop: "15px",
                padding: "0px",
                textAlign: "left",
                paddingLeft: "15px"
              }}
            >
              {item.product.price}
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div class="ui huge header">Order Details</div>
        <div class="ui horizontal divider">Items</div>
        <div class="ui equal width padded grid">{this.renderCartDetails()}</div>
        <div class="ui medium header">
          Total Amount: {this.state.totalAmount}
        </div>
        <div class="ui horizontal divider">Coupon Codes</div>

        <div class="ui action input">
          <input
            type="text"
            placeholder="Apply Coupon Code"
            onChange={e => this._handleCouponChange(e)}
          />
          <button class="ui button" onClick={e => this._handleCouponCode(e)}>
            Apply
          </button>
        </div>

        <div
          class="ui left labeled button"
          style={{ float: "right" }}
          onClick={e => this._handlePaymentAuth(e)}
        >
          <div class="ui basic label">Create Order</div>
          <div class="ui icon green button">
            <i class="arrow right icon" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ cart }) {
  return { cart };
}

export default connect(mapStateToProps, actions)(ConfirmOrder);
