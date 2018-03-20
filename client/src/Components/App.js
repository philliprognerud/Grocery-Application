/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

//Header Container
import Header from "../Containers/Header";

//Front Page Container
import FrontPage from "../Containers/FrontPage";

//Supplier page to add items
import SupplierPage from "../Containers/SupplierPage";

//Account page AccountMenu side bar
import AccountMenu from "./AccountPage/AccountMenu";

//Account info
import AccountInfo from "./AccountPage/AccountInfo";

//Order history
import OrderHistory from "./AccountPage/OrderHistory";

//Account page PromoCodes page
import PromoCodes from "./AccountPage/PromoCodes";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={FrontPage} />
            <Route path="/supplier/add-item" component={SupplierPage} />
            <Route path="/AccountMenu" component={AccountMenu} />
            <Route path="/AccountMenu/Account" component={AccountInfo} />
            <Route path="/AccountMenu/OrderHistory" component={OrderHistory} />
            <Route path="/AccountMenu/PromoCodes" component={PromoCodes} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
