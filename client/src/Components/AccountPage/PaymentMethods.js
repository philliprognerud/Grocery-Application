import React, { Component } from "react";

const style = {
  container: {
    height: "60%"
  },
  button: {
    marginTop: "10px",
    marginLeft: "30px",
    width: "120px",
    height: "80px"
  },
  icon: {
    marginLeft: "3px"
  },
  font: {
    fontSize: "12px",
    marginTop: "0px",
    marginLeft: "65px"
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
