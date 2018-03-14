import React, { Component } from "react";

const style = {
  div: {
    display: "table",
    margin: "0 auto",
    width: "500px",
    paddingTop: "57px",
    paddingBottom: "25px"
  },
  input: {
    width: "100%"
  }
};

class SearchBar extends Component {
  render() {
    return (
      <div className="ui search" style={style.div}>
        <input
          className="prompt"
          type="text"
          placeholder="Search by Keyword or item#"
          style={style.input}
        />
      </div>
    );
  }
}

export default SearchBar;
