/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ShoppingCart from "./Header/ShoppingCart";
import Logo from "./Header/Logo";
import MenuBar from "./Header/MenuBar";
import ActionCard from "./FrontPage/ActionCard";
import Login from "./Header/Login";
import CartSideBar from "./Header/CartSideBar";
import SearchBar from "./Header/SearchBar";
import Item from "./Header/Item"; // be sure to import your Component - S
import Carousel from "./Header/Carousel";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Logo />
          <ShoppingCart />
          <Login />
          <SearchBar />
          <MenuBar />
          <CartSideBar />
          <ActionCard />
          <Carousel />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
