import React, { Component } from "react";

const style = {
  container: {
    background: "white",
    height: "10%",
    width: "40%",
    marginLeft: "30%"
  }
};

class AccountInfo extends Component {
  render() {
    return (
      <div
        className="ui raised very padded container segment"
        style={style.container}
      >
        <h2>Account</h2>
        <p>Name: </p>
        <br />
        <p>Email: </p>
        <br />
      </div>
    );
  }
}
export default AccountInfo;
