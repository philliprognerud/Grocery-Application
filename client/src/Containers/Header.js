import React from "react";

import CartBtn from "../Components/Header/Cart/CartBtn";
import AccountDropDown from "../Components/Header/LoginRegister/AccountDropDown";
import LoginBtn from "../Components/Header/LoginRegister/LoginBtn";
import SearchBar from "../Components/Header/SearchBar";
import MenuBar from "../Components/Header/MenuBar";
import CartSideBar from "../Components/Header/Cart/CartSideBar";

let background =
  "https://img00.deviantart.net/ce62/i/2017/181/0/2/pickle_rick________by_stitchmonkey-dbelms5.png";

const Header = () => {
  return (
    <div>
      <div
        class="ui equal width center aligned grid"
        style={{
          backgroundImage: `url(${background})`,
          height: "300px"
        }}
      >
        <div
          className="two wide column"
          style={{ margin: "10px", marginRight: "0px", paddingRight: "15px" }}
        />
        <div className="six wide column" style={{ padding: "0px" }}>
          <div
            class="ui huge header"
            style={{
              fontSize: "3.5em",
              color: "white",
              marginTop: "100px",
              textShadow: "0px 1px 1px #4d4d4d"
            }}
          >
            Pickle Grocery
          </div>
          <SearchBar />
        </div>
        <div className="three wide column" style={{ padding: "0px" }}>
          <LoginBtn />
          <AccountDropDown />
          <CartBtn />
        </div>
      </div>

      <MenuBar />
      <CartSideBar />
    </div>
  );
};

export default Header;
