import React, { Component } from "react";

const style = {
  deptCard: {},
  image: {},
  text: {}
};

const deptLink = "/";
class Departments extends Component {
  constructor(props) {
    super(props);

    this.state = { depts: [] };
  }

  render() {
    return (
      <div class="ui stackable four column grid">
        <div class="column">
          <div style={style.deptCard}>
            <a href={deptLink}>
              <img src={require("../../Images/deptImage.jpg")} />
            </a>
          </div>
        </div>
        <div class="column" />
        <div class="column" />
        <div class="column" />
      </div>
    );
  }
}
export default Departments;
