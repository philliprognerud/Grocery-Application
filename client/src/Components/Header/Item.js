import React, { Component } from "react";

const style = {
  details: {
    textAlign: "left"
  },
  image: {
    // width: "50%"
  }
};

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = { item: {} };
  }

  render() {
    return (
      // render() needs a return statement - S.
      <div>
        <div className="ui small image">
          <a href="/">
            <img
              //src={require(this.props.image)} <-- gives error (?)
              src={require("../../Images/fish_arse.jpeg")}
              alt="generic grocery"
            />
          </a>
        </div>
        <div style={style.details} className="details">
          <h3>{this.props.item.price}</h3>
          <h5>{this.props.item.description}</h5>
          <p>{this.props.item.weight}</p>
        </div>
      </div>
    );
  }
}

export default Item;

/*
For Item.js it's going to get passed down information from the carousel 
container. Such as the image (link), the price, description, and 
weight in ounces, those will all be held in the state of the Item 
component.
*/
