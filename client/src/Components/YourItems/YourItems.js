/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";
import * as actions from "../../actions";

class YourItems extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: [] };

    this.renderTables = this.renderTables.bind(this);
  }

  async componentDidMount() {
    let res = await axios.post("/api/get-orders");

    if (res.data.orders) {
      this.setState({ orders: res.data.orders });
    }
  }

  async _handlePaymentAuth(index, e) {
    let cart = this.state.orders[index].item_list[0].items;

    //Add items to user cart
    await axios.post("/api/reorder-update-cart", {
      cart: cart
    });

    this.props.getUserCart();

    setTimeout(() => {
      //Get length of cart for CartBtn
      this.props.updateUserCart();
    }, 500);
  }

  renderTables() {
    if (this.state.orders.length > 0) {
      return this.state.orders.map((order, index) => {
        return (
          <div>
            <table
              class="ui celled structured orange table"
              style={{ marginBottom: "25px" }}
            >
              <thead>
                <tr>
                  <th colspan="1">Order ID: {" " + order._id}</th>
                  <th colspan="2">Total: {" $" + order.totalAmount}</th>
                </tr>
                <tr>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.item_list[0].items.map(item => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>x{item.quantity}</td>
                      <td>${item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot class="full-width">
                <tr>
                  <th colspan="3" style={{ padding: "7px" }}>
                    <div
                      class="ui left labeled button"
                      style={{ float: "right" }}
                      onClick={e => this._handlePaymentAuth(index, e)}
                    >
                      <div class="ui basic label">Order Again</div>
                      <div class="ui icon green button">
                        <i class="arrow right icon" />
                      </div>
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      });
    } else {
      return (
        <div>
          <table
            class="ui celled structured green table"
            style={{ marginBottom: "25px" }}
          >
            <thead>
              <tr>
                <th colspan="1">Order ID:</th>
                <th colspan="2">Total:</th>
              </tr>
              <tr>
                <th>Products</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }

  render() {
    return (
      <div class="ui centered grid" style={{ width: "1150px", margin: "auto" }}>
        <div class="column" style={{ marginTop: "30px" }}>
          <h1 class="ui header">Recent Orders</h1>
          <div class="ui segment">{this.renderTables()}</div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(YourItems);
