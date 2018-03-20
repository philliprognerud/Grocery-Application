import React, { Component } from "react";

import UpdateTable from "../Components/SupplierPage/UpdateTable";
import AddItemForm from "../Components/SupplierPage/AddItemForm";

class SupplierPage extends Component {
  render() {
    return (
      <div>
        <AddItemForm />
        <UpdateTable />
      </div>
    );
  }
}

export default SupplierPage;
