import React, { Component } from "react";

const style = {
  container: {
    marginTop: "30px",
    marginLeft: "15%",
    marginRight: "15%",
    padding: "20px",
    height: `${window.innerHeight}px`
  },
  cardContent: {
    float: "right"
  },
  cardText: {
    float: "left",
    padding: "0px 16px 16px",
    color: "#424242",
    fontSize: "20px",
    fontWeight: "600"
  }
};

class Departments extends Component {
  cardElement(details) {
    return (
      <div className="ui raised card">
        <a href={details.href}>
          <img
            style={style.cardContent}
            src={details.imageSrc}
            alt={details.alt}
          />
        </a>
        <div className="description" style={style.cardText}>
          <p>{details.name}</p>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div style={style.container}>
        <div className="ui grid container">
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/meat",
              imageSrc: require("../../Images/meat_pickle.jpg"),
              alt: "Meat Image",
              name: "Meat & Seafood"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/fruit",
              imageSrc: require("../../Images/fruit_pickle.jpg"),
              alt: "Fruit",
              name: "Fruit"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/vegetable",
              imageSrc: require("../../Images/veg_pickle.jpg"),
              alt: "Vegetables Image",
              name: "Vegetables"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/bakery",
              imageSrc: require("../../Images/bakery_pickle.jpg"),
              alt: "Meat Image",
              name: "Bakery"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/breakfast",
              imageSrc: require("../../Images/breakfast_pickle.jpg"),
              alt: "Breakfast Image",
              name: "Breakfast"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/frozen",
              imageSrc: require("../../Images/frozen_pickle.jpg"),
              alt: "Frozen Image",
              name: "Frozen"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/dairy",
              imageSrc: require("../../Images/dairy_pickle.jpg"),
              alt: "Dairy Image",
              name: "Dairy"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/pantry",
              imageSrc: require("../../Images/pantry_pickle.jpg"),
              alt: "Pantry Image",
              name: "Pantry"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/canned",
              imageSrc: require("../../Images/canned_pickle.jpg"),
              alt: "Canned Image",
              name: "Canned"
            })}
          </div>
          <div className="four wide column">
            {this.cardElement({
              href: "/departments/deli",
              imageSrc: require("../../Images/deli_pickle.jpg"),
              alt: "Deli Image",
              name: "Deli"
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Departments;
