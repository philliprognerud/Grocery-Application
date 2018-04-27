import React, { Component } from "react";
import axios from "axios";

import UpdateTable from "../Components/SupplierPage/UpdateTable";
import AddItemForm from "../Components/SupplierPage/AddItemForm";

class SupplierPage extends Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: false };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;

    let res = await axios.post("/api/check-session-id", {
      sessionId: params.sessionId
    });

    this.setState({ authenticated: res.data.authenticated });
  }

  render() {
    return (
      <div>
        {this.state.authenticated ? (
          <div>
            <AddItemForm />
            <UpdateTable />
          </div>
        ) : (
          <div>
            <p>You are not authorized to be here!</p>
          </div>
        )}
      </div>
    );
  }
}

export default SupplierPage;
