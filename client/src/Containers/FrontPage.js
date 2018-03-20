import React from "react";

import ActionCard from "../Components/FrontPage/ActionCard";
import Carousel from "../Components/Reusables/Carousel";

const style = {
  grid: {
    margin: "auto"
  },
  col: {
    width: "325px"
  }
};

const FrontPage = () => {
  return (
    <div>
      <div className="ui centered grid" style={style.grid}>
        <div className="column" style={style.col}>
          <ActionCard />
        </div>
        <div className=" column" style={style.col}>
          <ActionCard />
        </div>
        <div className=" column" style={style.col}>
          <ActionCard />
        </div>
      </div>
      <Carousel />
      <Carousel />
    </div>
  );
};

export default FrontPage;
