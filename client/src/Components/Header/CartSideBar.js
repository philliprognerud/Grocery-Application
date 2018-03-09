import React, { Component } from "react";

const style = {
    cartHeader: {
        backgroundColor: "green",
        color: "white",
    },
    itemList: {
        paddingTop: "2%"
    },
    checkout: {
        float: "right",
        marginRight: "10%",
        paddingTop: "5%"
    }
}

class CartSideBar extends Component {
    render() {
        return (
            <div className="ui very wide right vertical menu sidebar">
                <div className="cartHeader" style={style.cartHeader}>
                    Shopping Cart
                </div>
                <div className="itemList" style={style.itemList}>
                    <a className="item">
                        Item 1
                    </a>
                    <a className="item">
                        Item 2
                    </a>
                    <a className="item">
                        Item 3
                    </a>
                </div>
                <div className="checkoutBtn" style={style.checkout}>
                    <button class="ui right labeled icon button">
                      <i class="right arrow icon"></i>
                      Checkout
                    </button>
                </div>
            </div>
        );
    }
}

export default CartSideBar;