import React, { Component } from "react";

const style = {
  div: {
    margin: "0px",
    width: "325px",
    display: "inline-block",
    cursor: "pointer"
  },
  card: {
    background: "linear-gradient(to left, #ffeeee, #ddefbb)"
  },
  button: {
    width: "30%",
    marginLeft: "13px",
    marginBottom: "15px"
  },
  buttonFont: {
    fontSize: "9px",
    height: "25px"
  },
  circle: {
    marginLeft: "78%",
    marginBottom: "10px",
    marginTop: "-80px",
    overflow: "auto"
  },
  circleShape: {
    width: "60px",
    height: "60px",
    borderRadius: "100%",
    backgroundColor: "white"
  },
  icon: {
    marginTop: "20px",
    marginLeft: "20px"
  }
};

class ActionCard extends Component {
  render() {
    return (
      <div className="ui cards" style={style.div}>
        <div className="card" style={style.card}>
          <div className="content">
            <div className="header">Coupon Savings</div>
            <div className="description">Up to 40% off everyday Essentials</div>
          </div>
          <div className="ui two buttons" style={style.button}>
            <div className="ui basic green button" style={style.buttonFont}>
              Shop Coupon
            </div>
          </div>
          <div className="circle" style={style.circle}>
            <div className="circleShape" style={style.circleShape}>
              <i className="tags large icon" style={style.icon} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActionCard;
