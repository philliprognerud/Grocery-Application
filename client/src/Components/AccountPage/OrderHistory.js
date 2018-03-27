import React, { Component } from "react";

const style = {
  container: {
    background: "white",
    height: "10%",
    width: "40%"
  }
};

class OrderHistory extends Component {
  render() {
    return (
      <div
        className="ui raised padded container segment"
        style={style.container}
      >
        <h2>Order History</h2>
        <table class="ui unstackable table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Status</th>
              <th class="right aligned">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>02</td>
              <td>On The Way</td>
              <td class="right aligned">$1.22</td>
            </tr>
            <tr>
              <td>01</td>
              <td>Cancelled</td>
              <td class="right aligned">$0.50</td>
            </tr>
            <tr>
              <td>00</td>
              <td>Delivered</td>
              <td class="right aligned">$202.59</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderHistory;
