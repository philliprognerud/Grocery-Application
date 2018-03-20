import React, { Component } from "react";

const style = {
  itemText: {
    textAlign: "left"
  },
  image: {
    padding: "10px"
  },
  desc: {
    color: "#5a5a5a",
    lineHeight: "1.3em",
    marginBottom: "0px",
    maxHeight: "55px",
    overflow: "hidden",
    width: "80%"
  },
  price: {
    marginTop: "15px",
    marginBottom: "0",
    fontSize: "18px",
    fontWeight: "900"
  },
  weight: {
    color: "#999",
    fontSize: "12px",
    fontWeight: "300"
  }
};

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = { item: {} };
  }

  render() {
    return (
      <div>
        <div className="ui small image" style={style.image}>
          <a href="/">
            <img
              //src={require(`${this.props.item.image}`)}
              src={require("../../Images/fish_arse.jpeg")}
              alt="generic grocery"
            />
          </a>
        </div>
        <div style={style.itemText}>
          <p style={style.price}>{`$${this.props.item.price}`} </p>
          <p style={style.desc}>{this.props.item.description}</p>
          <p style={style.weight}>{this.props.item.weight}</p>
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
