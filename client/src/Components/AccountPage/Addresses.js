import React, { Component } from "react";

const style = {
  container: {
    background: "white",
    height: "10%",
    width: "40%"
  },
  setDefaultBtn: {
    float: "right"
  }
};

class Addresses extends Component {
  render() {
    return (
      <div className="ui raised container segment" style={style.container}>
        <h2>Addresses</h2>
        <div className="ui segments">
          <div className="ui segment">
            <p>Address 1</p>
          </div>
          <div className="ui segment">
            <p>Address 2</p>
          </div>
          <div className="ui segment">
            <p>Address 3</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Addresses;
