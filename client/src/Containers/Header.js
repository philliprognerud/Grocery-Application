import React from "react";

import LoginCartContainer from "../Components/Header/LoginCartContainer";
import Logo from "../Components/Header/Logo";
import SearchBar from "../Components/Header/SearchBar";
import MenuBar from "../Components/Header/MenuBar";
import CartSideBar from "../Components/Header/Cart/CartSideBar";

const Header = () => {
  return (
    <div>
      <Logo />
      <LoginCartContainer />
      <SearchBar />
      <MenuBar />
      <CartSideBar />
    </div>
  );
};

export default Header;
