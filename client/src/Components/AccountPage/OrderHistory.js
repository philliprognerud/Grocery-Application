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
      <div className="ui raised container segment" style={style.container}>
        <h2>Order History</h2>
        <div className="ui segments">
          <div className="ui segment">
            <p>Top</p>
          </div>
          <div className="ui segment">
            <p>Middle</p>
          </div>
          <div className="ui segment">
            <p>Bottom</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderHistory;
