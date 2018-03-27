import React, { Component } from "react";

const Account = "/AccountMenu";
const OrderHistory = "/AccountMenu/OrderHistory";
const Adresses = "/AccountMenu/Adresses";
const PaymentMethods = "/AccountMenu/PaymentMethods";
const PromoCodes = "/AccountMenu/PromoCodes";

const style = {
  container: {
    marginLeft: "6%",
    width: "22%",
    float: "left"
  },
  grid: {
    width: "100%"
  },
  icon: {
    float: "left",
    marginTop: "2px"
  },
  text: {
    marginLeft: "10px"
  }
};

class AccountMenu extends Component {
  render() {
    return (
      <div style={style.container}>
        <div className="ui vertical pointing menu" style={style.grid}>
          <div className="item">
            <a style={style.text} href={Account}>
              {" "}
              Account{" "}
            </a>
            <i className="user circle icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className="item">
            <a style={style.text} href={OrderHistory}>
              {" "}
              Order History{" "}
            </a>
            <i className="file alternate icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className="item">
            <a style={style.text} href={Adresses}>
              {" "}
              Addresses{" "}
            </a>
            <i className="home icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className="item">
            <a style={style.text} href={PaymentMethods}>
              {" "}
              Payment Methods{" "}
            </a>
            <i className="credit card icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className="item">
            <a style={style.text} href={PromoCodes}>
              {" "}
              Promo Codes{" "}
            </a>
            <i className="barcode icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
        </div>
      </div>
    );
  }
}
export default AccountMenu;
