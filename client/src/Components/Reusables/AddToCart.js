import React, { Component } from "react";
import { connect } from "react-redux";

const style = {
  div: {
    position: "absolute",
    marginTop: "5px",
    left: "45%",
    width: "100%"
  }
};

class AddToCart extends Component {
  _handleBtn(e) {
    this.props.btnClick(true);
  }

  render() {
    return (
      <div style={style.div}>
        <button
          className="circular ui icon green button"
          onClick={e => this._handleBtn(e)}
        >
          <i className="icon plus" /> Add
        </button>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AddToCart);
