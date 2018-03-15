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
          <p>
            <strong>
              <big>{this.props.price}</big>
            </strong>
          </p>
          <p>
            <span className="desc" style={style.desc}>
              {this.props.description}
            </span>
          </p>
          <p style={style.weight} className="weight">
            {this.props.weight}
          </p>
        </div>
      </div>
    );
  }
}
//<h3 className='price' style={style.price}>{this.props.item.price}</h3>
// <h5 className='desc'>{this.props.item.description}</h5>
// <p className='weight'>{this.props.item.weight}</p>
export default Item;

/*
For Item.js it's going to get passed down information from the carousel 
container. Such as the image (link), the price, description, and 
weight in ounces, those will all be held in the state of the Item 
component.
*/
