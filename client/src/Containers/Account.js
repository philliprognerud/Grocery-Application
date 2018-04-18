import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AccountMenu from "../Components/AccountPage/AccountMenu";
import AccountInfo from "../Components/AccountPage/AccountInfo";
import Addresses from "../Components/AccountPage/Addresses";
import OrderHistory from "../Components/AccountPage/OrderHistory";
import PaymentMethods from "../Components/AccountPage/PaymentMethods";
import PromoCodes from "../Components/AccountPage/PromoCodes";

const style = {
  container: {
    marginTop: "0.5%",
    paddingBottom: "0.5%"
  }
}

class Account extends Component {
  render() {
    return (
      <div style={style.container}>
        <div className="accountPage" >
          <AccountMenu />
        </div>
        <BrowserRouter>
        <div>
          <Route path="/accountmenu/account" component={AccountInfo} />
          <Route path="/accountmenu/orderhistory" component={OrderHistory} />
          <Route path="/accountmenu/addresses" component={Addresses} />
          <Route path="/accountmenu/paymentmethods" component={PaymentMethods} />
          <Route path="/accountmenu/promocodes" component={PromoCodes} />
        </div>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default Account;
