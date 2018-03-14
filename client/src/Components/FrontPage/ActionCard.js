import React, { Component } from "react";

const style = {
  div: {
    width: "10%",
    marginLeft: "20%",
    marginTop: "2%",
    backgroundColor: "#F0E68C"
  }
};

class ActionCard extends Component {
  render() {
    return (
      <div style={style.div}>
        <div style={style.button}>
          <button className="ui button" />
        </div>
        <div style={style.tag}>
          <i className="tag icon" style={style.tag} />
        </div>
      </div>
    );
  }
}

export default ActionCard;
