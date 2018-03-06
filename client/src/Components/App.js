/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ShoppingCart from "./ShoppingCart";
import Logo from "./Logo";
import MenuBar from "./MenuBar";
import ActionCard from "./ActionCard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Logo />
          <ShoppingCart />
          <Route exact path="/phil" component={Landing} />
          <Route exact path="/shawn/*" component={MenuBar} />
          <Route exact path="/dom/*" component={ActionCard} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
