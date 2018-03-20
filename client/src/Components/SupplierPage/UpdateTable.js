import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class UpdateTable extends Component {
  constructor(props) {
    super(props);

    this.state = { id: "", itemList: [] };
  }

  shouldComponentUpdate() {
    return true;
  }

  async componentDidUpdate() {
    //If props have been received, and state.id not set
    if (this.props.auth && !this.state.id) {
      this.setState({ id: this.props.auth._id });
    } else if (this.state.id) {
      const addedItemsList = await axios.post("/api/current-user-added-items", {
        id: this.state.id
      });

      //Check if array is empty, otherwise will keep re-rendering
      //Once page refreshes array goes back to empty so will work
      if (this.state.itemList.length <= 0 && addedItemsList.data.length > 0) {
        this.setState({
          itemList: addedItemsList.data
        });
      }
    }
  }

  async _handleDelete(e) {
    const removed = await axios.post("/api/remove-item", {
      userID: this.state.id,
      productID: e.target.getAttribute("name")
    });

    if (removed) {
      //For now we'll refresh page to update the table
      window.location.href = "/supplier/add-item";
    } else {
      //Failed at removing from DB
    }
  }

  renderTableRow() {
    if (this.state.id) {
      return this.state.itemList.map(item => {
        return (
          <tr>
            <td>{item.name}</td>
            <td>Yes</td>
            <td>${item.price}</td>
            <td>{item.weight} oz</td>
            <td>{item.stock} pcs</td>
            <td>{item.tags.join()}</td>
            <td>
              <i
                name={item._id}
                className="trash alternate outline icon large"
                style={{ cursor: "pointer" }}
                onClick={e => this._handleDelete(e)}
              />
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div
        style={{
          width: "50%",
          margin: "auto"
        }}
      >
        <h1 className="ui header">Your Added Items</h1>
        <table class="ui selectable inverted table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Stock</th>
              <th>Tags</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{this.renderTableRow()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(UpdateTable);
