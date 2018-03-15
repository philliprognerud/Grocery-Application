import React, { Component } from "react";

const style = {
  div: {
    marginLeft: "15%",
    marginTop: "30px",
    marginBottom: "30px"
  },
  card: {
    width: "40%",
    backgroundColor: "#FFE4B5"
  },
  button: {
    width: "30%",
    height: "25px",
    marginLeft: "13px",
    marginBottom: "30px"
  },
  buttonFont: {
    fontSize: "9px"
  },
  circle: {
    width: "9px",
    height: "10px"
  }
};

class ActionCard extends Component {
  render() {
    return (
      <div className="ui cards" style={style.div}>
        <div className="card">
          <div className="content">
            <div className="header">Coupon Savings</div>
            <div className="description">Up to 40% off everyday Essentials</div>
          </div>
          <div className="ui two buttons" style={style.button}>
            <div className="ui basic green button" style={style.buttonFont}>
              Shop Coupon
            </div>
          </div>
          <div className="circle" style={style.circle} />
        </div>
      </div>
    );
  }
}

export default ActionCard;
