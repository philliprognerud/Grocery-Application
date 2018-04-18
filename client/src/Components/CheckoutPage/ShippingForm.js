import React, { Component } from "react";

import axios from "axios";

class ShippingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      keyCode: "",
      instructions: "",
      showForm: false,
      addrs: [],
      activeSeg: -1
    };

    this.renderShipForm = this.renderShipForm.bind(this);
    this.renderAddrs = this.renderAddrs.bind(this);
  }

  async componentDidMount() {
    let addrs = await axios.get("/api/get-addrs");

    if (addrs.data.addrs.length > 0) {
      this.setState({
        addrs: addrs.data.addrs
      });
    }
  }

  async _handleShippingClick(e) {
    if (
      this.state.fullName &&
      this.state.address &&
      this.state.city &&
      this.state.state &&
      this.state.zip &&
      this.state.phone
    ) {
      await axios.post("/api/save-address", {
        fullName: this.state.fullName,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        phone: this.state.phone,
        instructions: this.state.instructions
      });

      let addrs = await axios.get("/api/get-addrs");

      if (addrs.data.addrs.length > 0) {
        this.setState({
          addrs: addrs.data.addrs,
          showForm: false
        });
      }
    }
  }

  nameChange(e) {
    this.setState({
      fullName: e.target.value
    });
  }

  addressChange(e) {
    this.setState({
      address: e.target.value
    });
  }

  cityChange(e) {
    this.setState({
      city: e.target.value
    });
  }

  stateChange(e) {
    this.setState({
      state: e.target.value
    });
  }

  zipChange(e) {
    this.setState({
      zip: e.target.value
    });
  }

  phoneChange(e) {
    let val = e.target.value;

    if (!/^[0-9-]*$/.test(val)) {
      val = val.slice(0, -1);
    }

    if ((val.length === 3 || val.length === 7) && !this.state.keyCode) {
      val += "-";
    }

    if (val.length > 12) {
      val = val.slice(0, -1);
    }

    this.setState({
      phone: val
    });
  }

  onKeyDown(e) {
    if (e.keyCode === 8) {
      this.setState({ keyCode: "8" });
    } else {
      this.setState({ keyCode: "" });
    }
  }

  instructionChange(e) {
    this.setState({ instructions: e.target.value });
  }

  async handleDeleteAddr(address, e) {
    let updatedAddrs = await axios.post("/api/remove-addr", {
      address: address
    });

    this.setState({
      addrs: updatedAddrs.data
    });
  }

  handleSegmentClick(index, e) {
    let segments = document.querySelectorAll(".ui.segment");

    segments.forEach((segment, i) => {
      if (this.state.activeSeg === i) {
        segment.classList.remove("green", "inverted");
      }

      if (segment.classList.value === `ui segment ${index}`) {
        segment.classList.add("green", "inverted");
        this.setState({ activeSeg: i });
      }
    });
  }

  handleConfirmShip(e) {
    if (this.state.activeSeg !== -1) {
      let address = this.state.addrs[this.state.activeSeg - 2];
      this.props.clicked(address, true);
    }
  }

  renderAddrs() {
    if (this.state.addrs.length > 0) {
      return this.state.addrs.map((addr, index) => {
        return (
          <div
            key={index}
            class={`ui segment ${index}`}
            style={{
              display: "inline-block",
              width: "490px",
              cursor: "pointer",
              marginBottom: "0px"
            }}
            onClick={e => this.handleSegmentClick(index, e)}
          >
            <div class="ui equal width center aligned padded grid">
              <div
                class="left floated six wide column"
                style={{ padding: "0px", display: "inline-block" }}
              >
                <div
                  class="row"
                  style={{ textAlign: "left", overflow: "hidden" }}
                >
                  {addr.fullName}
                </div>
                <div
                  class="row"
                  style={{ textAlign: "left", overflow: "hidden" }}
                >
                  {addr.phone}
                </div>
              </div>
              <div
                class="left floated column"
                style={{ padding: "0px", display: "inline-block" }}
              >
                <div
                  class="row"
                  style={{ textAlign: "left", overflow: "hidden" }}
                >
                  {addr.address}
                </div>
                <div
                  class="row"
                  style={{ textAlign: "left", overflow: "hidden" }}
                >
                  {addr.city}, {addr.state}, {addr.zip}
                </div>
              </div>
              <div class="two wide right floated column">
                <i
                  className="close icon"
                  style={{ cursor: "pointer" }}
                  onClick={e => this.handleDeleteAddr(addr.address, e)}
                />
              </div>
            </div>
          </div>
        );
      });
    }

    return;
  }

  renderShipForm() {
    if (this.state.showForm) {
      return (
        <div>
          <form
            className="ui form"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <div className="field focus">
              <label>Full Name</label>
              <input
                value={this.state.fullName}
                className="formInput"
                type="text"
                name="fullName"
                placeholder="ex. John Doe"
                onChange={e => this.nameChange(e)}
              />
            </div>

            <div className="field">
              <label>Address Line 1</label>
              <input
                value={this.state.address}
                className="formInput"
                type="text"
                name="addrln1"
                placeholder="ex. 1 Washington Sq"
                onChange={e => this.addressChange(e)}
              />
            </div>

            <div class="fields">
              <div class="field">
                <label>City</label>
                <input
                  type="text"
                  placeholder="San Jose"
                  onChange={e => this.cityChange(e)}
                />
              </div>
              <div class="field">
                <label>State</label>
                <input
                  type="text"
                  placeholder="CA"
                  onChange={e => this.stateChange(e)}
                />
              </div>
              <div class="field">
                <label>Zip</label>
                <input
                  type="text"
                  placeholder="94030"
                  onChange={e => this.zipChange(e)}
                />
              </div>
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input
                value={this.state.phone}
                className="formInput"
                type="text"
                placeholder="ex. 650-307-0951"
                onChange={e => this.phoneChange(e)}
                onKeyDown={e => this.onKeyDown(e)}
              />
            </div>

            <div
              class="ui orange labeled icon button"
              onClick={e => this._handleShippingClick(e)}
            >
              Save Address
              <i class="add icon" />
            </div>
          </form>

          <div class="ui horizontal divider">Delivery</div>

          <div class="ui form">
            <div class="field">
              Instructions for Delivery
              <textarea onChange={e => this.instructionChange(e)} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <button
            class="ui labeled orange icon button"
            onClick={e => this.setState({ showForm: true })}
          >
            <i class="plus icon" />
            Add Address
          </button>
          <div
            class="ui left labeled button"
            style={{ float: "right" }}
            onClick={e => this.handleConfirmShip(e)}
          >
            <div class="ui basic label">Confirm Shipping</div>
            <div class="ui icon green button">
              <i class="arrow right icon" />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderAddrs()}
        <div class="ui horizontal divider">Add Address</div>

        {this.renderShipForm()}
      </div>
    );
  }
}

export default ShippingForm;
