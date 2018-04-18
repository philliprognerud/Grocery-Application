import React, { Component } from "react";

import axios from "axios";

let checkedOut =
  "http://images4.fanpop.com/image/photos/18400000/pickle-delivery-pickles-18401263-373-500.jpg";

class Receipt extends Component {
  constructor(props) {
    super(props);

    this.state = { purchases: [] };

    this.renderOrderDetails = this.renderOrderDetails.bind(this);
  }

  async componentDidMount() {
    let p = await axios.get("/api/get-purchases");

    this.setState({ purchases: p.data.purchases });
  }

  renderOrderDetails() {
    if (this.state.purchases.length > 0) {
      return (
        <div class="ui compact segment">
          <div class="ui equal width center aligned padded grid">
            <div class="column">
              <div class="row">
                <div class="ui small header">Order ID: </div>
                {this.state.purchases[this.state.purchases.length - 1]._id}
              </div>
            </div>
            <div class="column">
              <div class="row">
                <div class="ui small header">Total Amount: </div>
                {
                  this.state.purchases[this.state.purchases.length - 1]
                    .totalAmount
                }
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div class="ui compact segment">
          <h1 class="ui header">Success!</h1>

          <p>Thank you for shopping at Pickle Grocery.</p>
          <p>Your order will be delivered within the next 24 - 48 hours</p>
        </div>
        {this.renderOrderDetails()}

        <div class="ui compact segment">
          <img
            class="ui medium image"
            src={checkedOut}
            alt="pickle"
            style={{ display: "inline-block" }}
          />
          <div
            class="ui left labeled button"
            style={{ position: "absolute" }}
            onClick={e => (window.location.href = "/")}
          >
            <div class="ui basic label">Pickle Grocery</div>
            <div class="ui icon orange button">
              <i class="arrow right icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Receipt;
