import React, { Component } from "react";

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
      let str = this.state.searchValue.replace(/\s/g, "+");
      window.location.href = "/departments/" + str;
    }
  }

  render() {
    return (
      <div className="ui search" style={{}}>
        <div className="ui icon input" style={style.input}>
          <input
            value={this.state.searchValue}
            className="prompt"
            type="text"
            placeholder="Search Pickle Grocery. . ."
            style={style.input}
            onChange={this.handleOnChange}
            onKeyPress={this.handleKeyPress}
          />
          <i className="search icon" />
        </div>
      </div>
    );
  }
}

export default SearchBar;
