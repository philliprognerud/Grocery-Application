import React, { Component } from "react";

const style = {
  grid: {
    marginLeft: "6%",
    width: "22%"
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
      <div className="ui vertical pointing menu" style={style.grid}>
        <div className="item">
          <a style={style.text}> Account </a>
          <i class="user circle icon" style={style.icon} />
          <i class="angle right icon" />
        </div>
        <div className="item">
          <a style={style.text}> Order History </a>
          <i class="file alternate icon" style={style.icon} />
          <i class="angle right icon" />
        </div>
        <div className="item">
          <a style={style.text}> Addresses </a>
          <i class="home icon" style={style.icon} />
          <i class="angle right icon" />
        </div>
        <div className="item">
          <a style={style.text}> Payment Methods </a>
          <i class="credit card icon" style={style.icon} />
          <i class="angle right icon" />
        </div>
        <div className="item active">
          <a style={style.text}> Promo Codes </a>
          <i class="barcode icon" style={style.icon} />
          <i class="angle right icon" />
        </div>
      </div>
    );
  }
}
export default AccountMenu;
