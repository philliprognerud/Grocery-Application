import React from "react";

// import ActionCard from "../Components/FrontPage/ActionCard";
import Carousel from "../Components/Reusables/Carousel";
import Departments from "../Components/Departments/Departments";

// const style = {
//   grid: {
//     margin: "auto"
//   },
//   col: {
//     width: "325px"
//   }
// };

const FrontPage = () => {
  return (
    <div>
      <Carousel keywords={["new"]} title="New Arrivals" />
      <Carousel keywords={["organic"]} title="Organic Foods" />

      <Departments />
    </div>
  );
};

export default FrontPage;

// <div className="ui centered grid" style={style.grid}>
//         <div className="column" style={style.col}>
//           <ActionCard />
//         </div>
//         <div className=" column" style={style.col}>
//           <ActionCard />
//         </div>
//         <div className=" column" style={style.col}>
//           <ActionCard />
//         </div>
//       </div>
