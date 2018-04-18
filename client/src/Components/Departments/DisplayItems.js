import React, { Component } from "react";
import axios from "axios";

import Item from "../Reusables/Item.js";

class DisplayItems extends Component {
  constructor(props) {
    super(props);

    this.state = { department: "", items: [] };
  }

  componentWillMount() {
    let path = window.location.pathname.split("/");

    path = path[path.length - 1].split("+");

    let builder = "";

    path.forEach(str => {
      builder += str.charAt(0).toUpperCase() + str.slice(1) + " ";
    });

    builder = builder.trim();

    this.setState({ department: builder });
  }

  async componentDidMount() {
    let keyword = this.state.department.toLowerCase();
    let items = [];

    if (keyword === "new") {
      items = await axios.post("/api/new-items");
    } else {
      items = await axios.post("/api/carousel-items", {
        keywords: keyword
      });
    }

    this.setState({ items: items.data });
  }

  renderItems() {
    if (this.state.items.length > 0) {
      return this.state.items.map((item, index) => {
        return (
          <Item
            key={index}
            fadeID={item._id}
            title={item.name}
            price={item.price}
            weight={item.weight}
            img={item.image}
            itemID={item._id}
          />
        );
      });
    }
  }

  render() {
    return (
      <div class="ui centered grid" style={{ width: "1150px", margin: "auto" }}>
        <div class="column" style={{ marginTop: "30px" }}>
          <div class="ui breadcrumb">
            <a class="section">Departments</a>
            <div class="divider"> / </div>
            <a class="section">{this.state.department}</a>
          </div>
          <h1 class="ui header">{this.state.department} Items</h1>
          <div class="ui segment">{this.renderItems()}</div>
        </div>
      </div>
    );
  }
}

export default DisplayItems;
