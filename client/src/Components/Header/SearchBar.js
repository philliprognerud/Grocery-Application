import React, { Component } from "react";
import axios from "axios";

const style = {
  div: {
    paddingTop: "57px",
    paddingBottom: "25px"
  },
  div2: {
    display: "table",
    margin: "0 auto",
    width: "600px"
  },
  input: {
    width: "100%"
  },
  searchIcon: {
    marginTop: "16px",
    marginRight: "10px"
  }
};

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleOnChange(e) {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
  }

  async handleKeyPress(e) {
    if (e.key === "Enter") {
      //Back-end POST request using axios
      //This sends information to your specified route in the back-end
      await axios.post("/auth/search", {
        fishassholes: this.state.searchValue
      });
    }
  }

  render() {
    return (
      <div className="ui search" style={style.div2}>
        <div className="ui icon input" style={{ ...style.div, ...style.div2 }}>
          <input
            value={this.state.searchValue}
            className="prompt"
            type="text"
            placeholder="Search by Keyword or item#"
            style={style.input}
            onChange={this.handleOnChange}
            onKeyPress={this.handleKeyPress}
          />
          <i className="search icon" style={style.searchIcon} />
        </div>
      </div>
    );
  }
}

export default SearchBar;
