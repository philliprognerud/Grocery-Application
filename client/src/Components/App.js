/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

//Header Components
import Logo from "./Header/Logo";
import SearchBar from "./Header/SearchBar";
import LoginCartContainer from "./Header/LoginCartContainer";
import MenuBar from "./Header/MenuBar";
import CartSideBar from "./Header/Cart/CartSideBar";

import ActionCard from "./FrontPage/ActionCard";
import Item from "./Header/Item";
import Carousel from "./Header/Carousel";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Logo />
            <LoginCartContainer />
            <SearchBar />
            <MenuBar />
            <CartSideBar />
            <ActionCard />
            <Carousel />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
