import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import SignupForm from "../Header/LoginRegister/SignupForm";
import LoginForm from "../Header/LoginRegister/LoginForm";
import ShippingForm from "./ShippingForm";
import Billing from "./Billing";
import ConfirmOrder from "./ConfirmOrder";
import Receipt from "./Receipt";

const style = {
  steps: {
    display: "inline-block",
    float: "left",
    marginLeft: "35px"
  },
  segment: {
    display: "inline-block",
    width: "550px",
    float: "left",
    marginLeft: "35px"
  },
  a: {
    cursor: "pointer",
    marginLeft: "7px"
  }
};

class Step extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerActive: true,
      shippingActive: false,
      billingActive: false,
      confirmActive: false,
      receiptActive: false,
      auth: false,
      registerComplete: false,
      shippingComplete: false,
      billingComplete: false,
      confirmComplete: false,
      login: false,
      signup: true,
      address: [],
      paymentType: "",
      cardIndex: -1
    };
  }

  componentDidMount() {
    //If payment status is TRUE then we can skip to confirm
    if (this.props.paymentStatus) {
      this.setState({
        registerActive: false,
        shippingActive: false,
        billingActive: false,
        confirmActive: false,
        auth: true,
        registerComplete: true,
        shippingComplete: true,
        billingComplete: true,
        confirmComplete: true,
        receiptActive: true
      });
    }
  }

  componentDidUpdate() {
    //If received props and auth===false then set State
    if (this.props.auth && !this.state.auth) {
      this.setState({
        registerActive: false,
        shippingActive: true,
        auth: true,
        registerComplete: true
      });
    }
  }

  async _handleRegister(guest, e) {
    //Make request to backend
    //Find old cookie cart, and merge it into logged in user cart
    if (guest !== "guest") {
      await axios.post("/api/merge-carts");
    }

    this.setState({
      registerActive: false,
      registerComplete: true,
      shippingActive: true
    });
  }

  _handleShippingBtn(address, clicked) {
    if (clicked) {
      this.setState({
        shippingActive: false,
        shippingComplete: true,
        billingActive: true,
        address: [...this.state.address, address]
      });
    }
  }

  _handlePaymentType(e) {
    if (e === "paypal") {
      this.setState({
        paymentType: "PayPal",
        billingActive: false,
        confirmActive: true,
        billingComplete: true,
        confirmComplete: false
      });
    } else {
      this.setState({
        paymentType: "Credit Card",
        cardIndex: e,
        billingActive: false,
        confirmActive: true,
        billingComplete: true,
        confirmComplete: false
      });
    }
  }

  _handleOrder(e) {
    console.log("im here");
  }

  loginCallBack(e) {
    this.setState({ login: true, signup: false });
  }

  signupCallBack(e) {
    this.setState({ login: false, signup: true });
  }

  renderSignupForm() {
    return (
      <div>
        {this.state.signup ? (
          <SignupForm
            clicked={e => this._handleRegister(e)}
            checkout={true}
            onLoginClick={e => this.loginCallBack(e)}
          />
        ) : null}
        {this.state.login ? (
          <LoginForm
            clicked={e => this._handleRegister(e)}
            checkout={true}
            onSignupClick={e => {
              this.signupCallBack(e);
            }}
          />
        ) : null}
        <div class="ui horizontal divider">Or</div>
        <h2 className="ui centered header">
          <div className="content">
            <div className="sub header">
              <a
                onClick={e => this._handleRegister("guest", e)}
                style={style.a}
              >
                Continue as guest
              </a>
            </div>
          </div>
        </h2>
      </div>
    );
  }

  render() {
    return (
      <div class="ui centered grid" style={{ marginTop: "75px" }}>
        <div class="eleven wide column">
          <div class="ui vertical steps" style={style.steps}>
            <div
              class={`${this.state.registerActive ? "active" : ""} ${
                this.state.registerComplete ? "completed" : ""
              }  step`}
            >
              <i className="user icon" />
              <div class="content">
                <div class="title">Register</div>
                <div class="description">
                  Create an account or continue as a guest.
                </div>
              </div>
            </div>

            <div
              class={`${this.state.shippingActive ? "active" : ""} ${
                this.state.shippingComplete ? "completed" : ""
              } step`}
            >
              <i class="truck icon" />
              <div class="content">
                <div class="title">Shipping</div>
                <div class="description">Choose your shipping options</div>
              </div>
            </div>

            <div
              class={`${this.state.billingActive ? "active" : ""} ${
                this.state.billingComplete ? "completed" : ""
              } step`}
            >
              <i class="payment icon" />
              <div class="content">
                <div class="title">Billing</div>
                <div class="description">Enter billing information</div>
              </div>
            </div>

            <div
              class={`${this.state.confirmActive ? "active" : ""} ${
                this.state.confirmComplete ? "completed" : ""
              } step`}
            >
              <i class="info icon" />
              <div class="content">
                <div class="title">Confirm Order</div>
                <div class="description">Verify order details</div>
              </div>
            </div>

            <div class="step">
              <i class="file alternate outline icon" />
              <div class="content">
                <div class="title">Receipt</div>
                <div class="description">Review invoice details</div>
              </div>
            </div>
          </div>

          <div class="ui attached segment" style={style.segment}>
            <div class="ui segments ">
              <div class="ui segment">
                {this.state.registerActive ? this.renderSignupForm() : null}
                {this.state.shippingActive ? (
                  <ShippingForm
                    clicked={(address, e) =>
                      this._handleShippingBtn(address, e)
                    }
                  />
                ) : null}
                {this.state.billingActive ? (
                  <Billing
                    address={this.state.address[0]}
                    confirmPayment={e => this._handlePaymentType(e)}
                  />
                ) : null}

                {this.state.confirmActive ? (
                  <ConfirmOrder
                    orderCreated={e => this._handleOrder(e)}
                    paymentType={this.state.paymentType}
                    cardIndex={this.state.cardIndex}
                  />
                ) : null}

                {this.state.receiptActive ? <Receipt /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Step);
