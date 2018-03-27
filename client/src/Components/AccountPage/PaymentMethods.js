import React, { Component } from "react";

const style = {
  container: {
    height: "60%"
  },
  button: {
    marginTop: "10px",
    marginLeft: "30px",
    width: "8%",
    height: "80px",
    borderRadius: "10%"
  },
  icon: {
    marginLeft: "3px"
  },
  font: {
    fontSize: "12px",
    marginTop: "0px",
    marginLeft: "32%"
  }
};

class PaymentMethods extends Component {
  render() {
    return (
      <div className="container" style={style.container}>
        <button className="ui grey basic button" style={style.button}>
          <i className="plus icon" style={style.icon} />
        </button>
        <h1 style={style.font}> New Card </h1>
      </div>
    );
  }
}
export default PaymentMethods;
