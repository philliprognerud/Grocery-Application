import React, { Component } from "react";
import Item from "./Item.js";
import Slider from "react-slick";
import axios from "axios";

const style = {
  container: {
    margin: "0px auto",
    width: "1200px",
    paddingBottom: "30px",
    backgroundColor: "white",
    paddingLeft: "60px",
    paddingRight: "70px",
    borderRadius: "8px",
    marginBottom: "30px"
  },
  gridHeader: {
    marginTop: "0px",
    lineHeight: "30px",
    color: "rgb(153,153,153)",
    paddingBottom: "24px",
    fontSize: "18px",
    paddingTop: "19px",
    paddingRight: "3%",
    paddingLeft: "3%",
    fontWeight: "100"
  },
  textRight: {
    float: "right",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "40px"
  },
  viewMoreLink: {
    color: "#e1781d"
  },
  item: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  nextButton: {
    color: "red"
  },
  prevButton: {
    color: "rgb(247,247,247)"
  },
  arrowIcon: {
    color: "rgb(247,247,247)"
  }
};
const tempItems = [
  {
    id: "1",
    price: "1.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio Maecenas mattis. Sed convallis tristique sem.",
    weight: "1 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "2",
    price: "2.00",
    description:
      "Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.",
    weight: "2 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "3",
    price: "3.00",
    description: "Praesent mauris. Fusce nec tellus sed augue semper porta",
    weight: "3 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "4",
    price: "4.00",
    description: "Maecenas mattis. Sed convallis tristique sem",
    weight: "4 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "4",
    price: "4.00",
    description: "Maecenas mattis. Sed convallis tristique sem",
    weight: "4 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "4",
    price: "4.00",
    description: "Maecenas mattis. Sed convallis tristique sem",
    weight: "4 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "4",
    price: "4.00",
    description: "Maecenas mattis. Sed convallis tristique sem",
    weight: "4 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "4",
    price: "4.00",
    description: "Maecenas mattis. Sed convallis tristique sem",
    weight: "4 oz",
    image: "../../Images/pickle_logo.png"
  }
];

const PrevArrow = props => {
  return (
    <div className={props.className}>
      <button
        style={style.prevButton}
        onClick={props.onClick}
        className="circular ui icon button"
      >
        <i style={style.arrowIcon} className="icon chevron circle left" />
      </button>
    </div>
  );
};

const NextArrow = props => {
  return (
    <div style={style.buttonWrap} className={props.className}>
      <button
        style={style.nextButton}
        onClick={props.onClick}
        className="circular ui icon button"
      >
        <i style={style.arrowIcon} className="icon chevron circle right" />
      </button>
    </div>
  );
};

const disp = tempItems.map(item => {
  return (
    <div>
      <Item key={item.id} item={item} />
    </div>
  );
});
const settings = {
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};
class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = { display: [] };
  }

  async componentWillMount() {
    //QUERY DB TEST:
    // const newestItems = await axios.get("/api/newly-added", { limit: 20 });
    // console.log(newestItems);
  }

  componentDidMount() {
    document.querySelector(
      ".slick-initialized.slick-slider"
    ).style.paddingLeft =
      "30px";
  }

  render() {
    return (
      <div style={style.container} className="container">
        <div style={style.gridHeader}>
          New Arrivals
          <span style={style.textRight} id="right" className="ui header">
            <a style={style.viewMoreLink} href="/">
              View More
            </a>
          </span>
        </div>
        <Slider {...settings}>{disp}</Slider>
      </div>
    );
  }
}

export default Carousel;
