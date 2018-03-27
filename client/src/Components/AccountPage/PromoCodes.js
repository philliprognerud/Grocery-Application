import React, { Component } from "react";

const style = {
  button: {
    marginLeft: "30%",
    marginTop: "10px"
  },
  icon: {
    float: "left",
    marginTop: "2px"
  },
  description: {
    fontSize: "15px",
    color: "Green"
  },
  title: {
    color: "Green"
  }
};

class AccountMenu extends Component {
  render() {
    return (
      <div style={style.button}>
        <h1 style={style.title}> Promo Codes </h1>
        <h1 style={style.description}> Apply Discounts to your Account </h1>
        <div className="button">
          <button class="ui primary button">Redeem Promo Code</button>
        </div>
      </div>
    );
  }
}
export default AccountMenu;
