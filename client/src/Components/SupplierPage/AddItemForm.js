import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import FormData from "form-data";

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      itemName: "",
      itemPrice: "",
      itemWeight: "",
      stock: "",
      tags: ""
    };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  async _handleSubmit(e) {
    e.preventDefault();

    let data = new FormData();
    data.append("file", this.state.imagePreviewUrl);
    data.append("name", this.state.file.name);

    //TO-DO:
    //Need to make sure input fields are filled out before this request
    //Make sure user is logged in the display route
    const newProduct = await axios.post("/api/supplier-add-item", {
      image: this.state.imagePreviewUrl,
      imageName: this.state.file.name,
      itemName: this.state.itemName,
      itemPrice: this.state.itemPrice,
      itemWeight: this.state.itemWeight,
      stock: this.state.stock,
      tags: this.state.tags,
      id: this.props.auth._id
    });

    console.log(newProduct);

    window.location.href = "/supplier/add-item";
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  _handleNameChange(e) {
    this.setState({
      itemName: e.target.value
    });
  }

  _handlePriceChange(e) {
    this.setState({
      itemPrice: e.target.value
    });
  }

  _handleWeightChange(e) {
    this.setState({
      itemWeight: e.target.value
    });
  }

  _handleStockChange(e) {
    this.setState({
      stock: e.target.value
    });
  }

  _handleTagChange(e) {
    this.setState({
      tags: e.target.value
    });
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="uploaded img" />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div
        className="ui two column centered grid"
        style={{ marginTop: "50px" }}
      >
        <div className="column">
          <div
            className="previewComponent"
            style={{ width: "40%", margin: "auto" }}
          >
            <h3 className="ui header">Add Product</h3>
            <form className="ui form" onSubmit={e => this._handleSubmit(e)}>
              <div className="field">
                <label>Item Name</label>
                <input
                  type="text"
                  placeholder="ex: Trader Joe's Apples"
                  value={this.state.itemName}
                  onChange={e => this._handleNameChange(e)}
                />
              </div>

              <div className="field">
                <label>Item Price</label>
                <input
                  type="text"
                  placeholder="ex: $0.00"
                  value={this.state.itemPrice}
                  onChange={e => this._handlePriceChange(e)}
                />
              </div>

              <div className="field">
                <label>Item Weight</label>
                <input
                  type="text"
                  placeholder="ex: 16.0 oz"
                  value={this.state.itemWeight}
                  onChange={e => this._handleWeightChange(e)}
                />
              </div>

              <div className="field">
                <label>Stock Amount</label>
                <input
                  type="text"
                  placeholder="100"
                  value={this.state.stock}
                  onChange={e => this._handleStockChange(e)}
                />
              </div>

              <div className="field">
                <label>Tags</label>
                <input
                  type="text"
                  placeholder="Please tag your items seperated by commas"
                  value={this.state.tags}
                  onChange={e => this._handleTagChange(e)}
                />
              </div>

              <div className="field">
                <input
                  className="fileInput"
                  type="file"
                  onChange={e => this._handleImageChange(e)}
                />
              </div>
              <button
                className="submitButton ui button"
                type="submit"
                onClick={e => this._handleSubmit(e)}
              >
                Add Item
              </button>
            </form>
            <div className="imgPreview" style={{ marginTop: "25px" }}>
              {$imagePreview}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AddItemForm);
