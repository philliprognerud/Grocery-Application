import React, { Component } from "react";

const Account = "/accountmenu/account";
const OrderHistory = "/accountmenu/orderhistory";
const Addresses = "/accountmenu/addresses";
const PaymentMethods = "/accountmenu/paymentmethods";
const PromoCodes = "/accountmenu/promocodes";

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
  constructor(props) {
    super(props);

    this.state = {
      account: "",
      orderHistory: "",
      addresses: "",
      payment: "",
      promo: ""
    };
  }

  componentDidMount() {
    let path = window.location.pathname;

    if (path === Account) {
      this.setState({
        account: "active",
        orderHistory: "",
        addresses: "",
        payment: "",
        promo: ""
      });
    } else if (path === OrderHistory) {
      this.setState({
        account: "",
        orderHistory: "active",
        addresses: "",
        payment: "",
        promo: ""
      });
    } else if (path === Addresses) {
      this.setState({
        account: "",
        orderHistory: "",
        addresses: "active",
        payment: "",
        promo: ""
      });
    } else if (path === PaymentMethods) {
      this.setState({
        account: "",
        orderHistory: "",
        addresses: "",
        payment: "active",
        promo: ""
      });
    } else if (path === PromoCodes) {
      this.setState({
        account: "",
        orderHistory: "",
        addresses: "",
        payment: "",
        promo: "active"
      });
    }
  }

  _handleAccountClick(e) {
    this.setState({
      account: "active",
      orderHistory: "",
      addresses: "",
      payment: "",
      promo: ""
    });
  }

  _handleOrderHistoryClick(e) {
    this.setState({
      account: "",
      orderHistory: "active",
      addresses: "",
      payment: "",
      promo: ""
    });
  }

  _handleAddressesClick(e) {
    this.setState({
      account: "",
      orderHistory: "",
      addresses: "active",
      payment: "",
      promo: ""
    });
  }

  _handlePaymentClick(e) {
    this.setState({
      account: "",
      orderHistory: "",
      addresses: "",
      payment: "active",
      promo: ""
    });
  }

  _handlePromoClick(e) {
    this.setState({
      account: "",
      orderHistory: "",
      addresses: "",
      payment: "",
      promo: "active"
    });
  }

  render() {
    return (
      <div style={style.container}>
        <div className="ui vertical pointing menu" style={style.grid}>
          <div className={`${this.state.account} item`}>
            <a
              style={style.text}
              href={Account}
              onClick={e => this._handleAccountClick(e)}
            >
              {" "}
              Account{" "}
            </a>
            <i className="user circle icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className={`${this.state.orderHistory} item`}>
            <a
              style={style.text}
              href={OrderHistory}
              onClick={e => this._handleOrderHistoryClick(e)}
            >
              {" "}
              Order History{" "}
            </a>
            <i className="file alternate icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className={`${this.state.addresses} item`}>
            <a
              style={style.text}
              href={Addresses}
              onClick={e => this._handleAddressesClick(e)}
            >
              {" "}
              Addresses{" "}
            </a>
            <i className="home icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className={`${this.state.payment} item`}>
            <a
              style={style.text}
              href={PaymentMethods}
              onClick={e => this._handlePaymentClick(e)}
            >
              {" "}
              Payment Methods{" "}
            </a>
            <i className="credit card icon" style={style.icon} />
            <i className="angle right icon" />
          </div>
          <div className={`${this.state.promo} item`}>
            <a
              style={style.text}
              href={PromoCodes}
              onClick={e => this._handlePromoClick(e)}
            >
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
