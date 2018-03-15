import React, { Component } from "react";
import Item from "./Item.js";
import Slider from "react-slick";

const style = {
  textLeft: {
    float: "left",
    marginTop: "-3%",
    position: "relative",
    top: "0",
    left: "96px"
  },
  textRight: {
    float: "right",
    marginTop: "-3%"
  },
  item: {
    marginLeft: "10px",
    marginRight: "10px"
  },
  container: {
    margin: "80px auto",
    width: "77%",
    paddingBottom: "100px"
  },
  gridHeader: {
    marginTop: "0px",
    display: "inline-block"
  },
  inSlider: {
    display: "inline-block",
    width: 500
  },

  nextButton: {
    color: "red"
  },
  prevButton: {
    color: "green"
  }
};
const tempItems = [
  {
    id: "1",
    price: "1.00",
    description: "first asfdlsdkjf asflkjas dflkjasdf lkjasdf kjasdf ",
    weight: "1 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "2",
    price: "2.00",
    description: "second",
    weight: "2 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "3",
    price: "3.00",
    description: "third",
    weight: "3 oz",
    image: "../../Images/pickle_logo.png"
  },
  {
    id: "4",
    price: "4.00",
    description: "fourth",
    weight: "4 oz",
    image: "../../Images/pickle_logo.png"
  }
];

const disp = tempItems.map(item => {
  return (
    <div>
      <Item key={item.id} item={item} />
    </div>
  );
});

const PrevArrow = props => {
  return (
    <div>
      <button
        style={style.prevButton}
        onClick={props.onClick}
        className={`circular ui icon button ${props.className}`}
      >
        <i className="arrow circle icon left" />
      </button>
    </div>
  );
};
const NextArrow = props => {
  return (
    <button
      style={style.nextButton}
      onClick={props.onClick}
      className={`circular ui icon button ${props.className}`}
      //good 2 go, I used the ES6 syntax backticks `` instead of ""
    >
      <i className="arrow circle right icon" />
    </button>
  );
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  centerPadding: "80px",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = { display: [] };
  }

  render() {
    return (
      <div style={style.container} className="container">
        <div className="gridHeader">
          <h4 style={style.textLeft} id="left" className="ui header">
            New Arrivals
          </h4>
          <h4 style={style.textRight} id="right" className="ui header">
            <a href="/">View More</a>
          </h4>
        </div>
        <Slider {...settings}>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
          <div>
            <div style={style.item}>{disp[0]}</div>
          </div>
        </Slider>
      </div>
    );
  }
}
//     return (
//       //Scroll down to get the commented out code if you need it, everything should be good to go now -Phil
//       <div
//         style={{
//           margin: "50px auto",
//           width: "800px",
//           paddingBottom: "100px"
//         }}
//       >
//         <h2> New Arrivals</h2>
//         <Slider {...settings}>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//           <div>
//             <div style={style.item}>{disp[0]}</div>
//           </div>
//         </Slider>
//       </div>
//     );
//   }

export default Carousel;
/*
this will receive its list of items as a property. and display them in the 
grid


Basically the container is going to have the top left text, 
the top right "view more" (which will take them to the department page),
and then it should have a GRID so the items will be aligned within the 
carousel. Additionally, when you hover on the right side an arrow will 
pop up to scroll right (this requires a bit of css, so handle this last).

Just work on visually getting it to look like the mock up. 
Then after that we can dip into the backend request stuff, 
and functionality
*/

// return (
//   <div style={style.carouselContainer} className="carouselContainer">
//     <div className="gridHeader">
//       <h4 style={style.textLeft} id="left" className="ui header">
//         New Arrivals
//       </h4>
//       <h4 style={style.textRight} id="right" className="ui header">
//         <a href="/">View More</a>
//       </h4>
//     </div>
//     <div style={style.itemGrid} className="ui stackable four column grid">
//       <div style={style.item} className="column">
//         {disp[0]}
//       </div>
//       <div style={style.item} className="column">
//         {disp[1]}
//       </div>
//       <div style={style.item} className="column">
//         {disp[2]}
//       </div>
//       <div style={style.item} className="column">
//         {disp[3]}
//       </div>
//     </div>;
//   </div>
// );initSlick(){

// return (
//   <div className="container">
//     <div className="gridHeader">
//       <h4 style={style.textLeft} id="left" className="ui header">
//         New Arrivals
//       </h4>
//       <h4 style={style.textRight} id="right" className="ui header">
//         <a href="/">View More</a>
//       </h4>
//     </div>
//     <div
//     className="carouselContainer"
//     data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>
//         <div>
//           <div className="inSlider">{disp[0]}</div>
//         </div>
//         <div>
//           <div className="inSlider">{disp[1]}</div>
//         </div>
//         <div>
//           <div className="inSlider">{disp[2]}</div>
//         </div>
//         <div>
//           <div className="inSlider">{disp[3]}</div>
//         </div>
//     </div>
//   </div>
// );
