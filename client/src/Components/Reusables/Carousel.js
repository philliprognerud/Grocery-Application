/* eslint-disable no-unreachable, no-unused-vars, no-undef */

import React, { Component } from "react";
import Item from "./Item.js";
import Slider from "react-slick";
import axios from "axios";

const style = {
  segment: {
    border: "0px"
  },
  headerSegment: {
    paddingTop: "30px",
    paddingBottom: "0px",
    paddingLeft: "35px",
    paddingRight: "35px"
  },
  prevArrow: {
    position: "absolute",
    top: "50%",
    left: "-2.7%"
  },
  nextArrow: {
    position: "absolute",
    top: "50%",
    right: "-3%"
  },
  viewMore: {
    float: "right",
    color: "orange",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline"
  }
};

const settings = {
  draggable: false,
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: false
};

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };

    this.renderItems = this.renderItems.bind(this);
  }

  async componentDidMount() {
    //QUERY DB:
    let newestItems = [];
    if (this.props.keywords[0] === "new") {
      newestItems = await axios.post("/api/new-items");
    } else {
      newestItems = await axios.post("/api/carousel-items", {
        keywords: this.props.keywords
      });
    }

    this.setState({ items: newestItems.data });
  }

  _handlePrevArrow(e) {
    this.slider.slickPrev();
  }

  _handleNextArrow(e) {
    this.slider.slickNext();
  }

  _handleViewMore(e) {
    window.location.href = "/departments/" + this.props.keywords[0];
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
            carousel={true}
          />
        );
      });
    }
  }

  render() {
    return (
      <div class="ui centered grid" style={{ marginTop: "0px" }}>
        <div class="column" style={{ width: "1200px" }}>
          <button
            onClick={e => this._handlePrevArrow(e)}
            className="circular ui icon button green"
            style={style.prevArrow}
          >
            <i className="icon angle left large" />
          </button>

          <div class="ui segments carousel">
            <div class="ui segment" style={style.headerSegment}>
              <h3 className="ui  header">
                <div class="content">{this.props.title}</div>
                <div
                  class="sub header"
                  style={style.viewMore}
                  onClick={e => this._handleViewMore(e)}
                >
                  View More >>
                </div>
              </h3>
            </div>
            <div class="ui segment" style={style.segment}>
              <Slider {...settings} ref={c => (this.slider = c)}>
                {this.renderItems()}
              </Slider>
            </div>
          </div>
          <button
            onClick={e => this._handleNextArrow(e)}
            className="circular ui icon button green"
            style={style.nextArrow}
          >
            <i className="icon angle right large" />
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
