import React, { Component } from "react";
import axios from "axios";

import PaymentMethods from "../AccountPage/PaymentMethods";

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ppActive: false,
      cardForm: false,
      name: "",
      cardNumber: "",
      cvc: "",
      expireMonth: "",
      expireYear: "",
      cards: [],
      selected: -1
    };

    this.renderCardForm = this.renderCardForm.bind(this);
  }

  async componentDidMount() {
    let res = await axios.get("/api/get-cards");

    this.setState({ cards: res.data.cards, cardForm: false });
  }

  async handleAddCard(e) {
    const { name, cardNumber, cvc, expireMonth, expireYear } = this.state;

    await axios.post("/api/save-card", {
      name,
      cardNumber,
      cvc,
      expireMonth,
      expireYear
    });

    let res = await axios.get("/api/get-cards");

    this.setState({ cards: res.data.cards, cardForm: false });
  }

  async handleCheckout(e) {
    this.setState({ ppActive: true, selected: -1 });
  }

  handleConfirmPayment(e) {
    if (this.state.ppActive || this.state.selected !== -1) {
      this.props.confirmPayment(
        this.state.ppActive ? "paypal" : this.state.selected
      );
    }
  }

  handleCardClick(e) {
    this.setState({ cardForm: true });
  }

  cardSelected(index, e) {
    this.setState({ selected: index, ppActive: false });
  }

  nameChange(e) {
    this.setState({ name: e.target.value });
  }

  numberChange(e) {
    this.setState({ cardNumber: e.target.value });
  }
  cvcChange(e) {
    this.setState({ cvc: e.target.value });
  }
  monthChange(e) {
    this.setState({ expireMonth: e.target.value });
  }

  yearChange(e) {
    this.setState({ expireYear: e.target.value });
  }

  renderCardForm() {
    return (
      <div>
        <form class="ui form">
          <div class="seven wide field">
            <label>Name On Card</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={e => this.nameChange(e)}
            />
          </div>
          <div class="fields">
            <div class="seven wide field">
              <label>Card Number</label>
              <input
                type="password"
                name="card[number]"
                maxLength="16"
                placeholder="Card #"
                onChange={e => this.numberChange(e)}
              />
            </div>
            <div class="three wide field">
              <label>CVC</label>
              <input
                type="text"
                name="card[cvc]"
                maxLength="3"
                placeholder="CVC"
                onChange={e => this.cvcChange(e)}
              />
            </div>
            <div class="six wide field">
              <label>Expiration</label>
              <div class="two fields">
                <div class="field">
                  <select
                    class="ui fluid search dropdown"
                    name="card[expire-month]"
                    onChange={e => this.monthChange(e)}
                  >
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div class="field">
                  <input
                    type="text"
                    name="card[expire-year]"
                    maxLength="4"
                    placeholder="Year"
                    onChange={e => this.yearChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="ui orange labeled icon button"
            onClick={e => this.handleAddCard(e)}
          >
            Add Card
            <i class="add icon" />
          </div>
        </form>
      </div>
    );
  }

  renderCards() {
    return this.state.cards.map((card, index) => {
      return (
        <div
          key={index}
          className={`ui compact segment ${
            this.state.selected === index ? "inverted green" : ""
          }`}
          style={{
            width: "200px",
            display: "inline-block",
            marginLeft: "10px",
            marginRight: "10px",
            cursor: "pointer"
          }}
          onClick={e => this.cardSelected(index, e)}
        >
          <div class="ui equal width center aligned padded grid">
            <div
              class="column"
              style={{ padding: "0px", display: "inline-block" }}
            >
              <div
                class="row"
                style={{
                  textAlign: "left",
                  overflow: "hidden",
                  padding: "5px"
                }}
              >
                <div class="ui small header">{card.name}</div>
              </div>
              <div
                class="row"
                style={{
                  textAlign: "left",
                  overflow: "hidden",
                  padding: "5px"
                }}
              >
                Visa ending in{" "}
                <div class="ui small header">{card.cardNumber.slice(-4)}</div>
              </div>
              <div
                class="row"
                style={{
                  textAlign: "left",
                  overflow: "hidden",
                  padding: "5px"
                }}
              >
                Expiration: {card.expireMonth}/{card.expireYear}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div class="ui huge header">Choose Payment Method</div>
        {this.state.cards.length > 0 ? this.renderCards() : null}
        <div onClick={e => this.handleCardClick(e)}>
          {this.state.cardForm ? null : <PaymentMethods />}
          {this.state.cardForm ? this.renderCardForm() : null}
        </div>
        <div class="ui horizontal divider">Other</div>
        <button
          className={`ui paypal button ${
            this.state.ppActive ? "positive" : ""
          }`}
          onClick={e => this.handleCheckout(e)}
          name="paypal"
        >
          <i className="paypal icon" />
          PayPal
        </button>
        <div
          class="ui left labeled button"
          style={{ float: "right" }}
          onClick={e => this.handleConfirmPayment(e)}
        >
          <div class="ui basic label">Confirm Payment</div>
          <div class="ui icon green button">
            <i class="arrow right icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default Billing;
