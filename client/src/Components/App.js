/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

//Header Container
import Header from "../Containers/Header";

//Front Page Container
import FrontPage from "../Containers/FrontPage";

//Supplier page to add items
import SupplierPage from "../Containers/SupplierPage";

//Account page Container
import Account from "../Containers/Account";

import Departments from "./Departments/Departments.js";

import DisplayItems from "./Departments/DisplayItems";

import YourItems from "./YourItems/YourItems";

import Step from "./CheckoutPage/Step";
import Header2 from "./CheckoutPage/Header2";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.updateUserCart();
    this.props.getUserCart();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/checkout" component={Header2} />
              <Route path="/" component={Header} />
            </Switch>

            <Route path="/" exact component={FrontPage} />

            <Switch>
              <Route
                path="/checkout/success"
                render={props => <Step paymentStatus={true} {...props} />}
              />
              <Route
                path="/checkout"
                render={props => <Step paymentStatus={false} {...props} />}
              />
            </Switch>

            <Route
              path="/supplier/add-item/:sessionId"
              component={SupplierPage}
            />
            <Route path="/accountmenu/*" component={Account} />

            <Route path="/departments/*" component={DisplayItems} />
            <Route path="/departments" component={Departments} />

            <Route path="/items" component={YourItems} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);

//Department:
// <Route path="/departments" component={Departments} />
