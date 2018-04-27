/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from "react";
import axios from "axios";

import Item from "../Reusables/Item.js";

class DisplayItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      department: "",
      items: [],
      sale: false,
      lowFirst: false,
      highFirst: false
    };
  }

  componentDidUpdate() {
    $(".ui.selection.dropdown").dropdown();

    document.querySelectorAll(".cart.display").forEach((item, index) => {
      item.style.display = "none !important";
    });
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

    this.setState({
      items: items.data,
      sale: keyword.includes("sale") ? true : false
    });
  }

  handleSortClick(str, e) {
    let tempItems = this.state.items;
    if (str === "high") {
      tempItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (str === "low") {
      tempItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    this.setState({ lowFirst: true, highFirst: false, items: tempItems });
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
            sale={this.state.sale ? true : false}
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
          <div
            class="ui selection dropdown"
            style={{ position: "absolute", top: "60px", right: "1.5%" }}
          >
            <input type="hidden" />
            <i class="dropdown icon" />
            <div class="default text">Sort by ...</div>
            <div class="menu">
              <div
                class="item"
                data-value="1"
                onClick={e => this.handleSortClick("low", e)}
              >
                Low to High
              </div>
              <div
                class="item"
                data-value="0"
                onClick={e => this.handleSortClick("high", e)}
              >
                High to Low
              </div>
            </div>
          </div>
          <div class="ui segment displayItems">{this.renderItems()}</div>
        </div>
      </div>
    );
  }
}

export default DisplayItems;
