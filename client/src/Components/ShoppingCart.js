/*eslint-disable no-unreachable, no-extra-semi, no-unused-vars, no-undef, unknown-require, forbiddenExportImport, semi, no-const-assign, check-tern-plugin*/

import React, { Component } from 'react';

const cartStyle = {
        float: 'right',
        maxWidth: '3.5em',
        display: "inline-block",
        marginRight: "50px",
        marginTop: "55px",
}

class ShoppingCart extends Component {
    render() {
        return (
            <a href = "/shoppingcart" >
                <img src={require('../Images/cart.png')} style = {cartStyle} className="shopping cart icon large"></img>
            </a>
            
            
            
        );
    };
}

export default ShoppingCart;