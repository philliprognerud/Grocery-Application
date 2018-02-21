import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div>
                <div class="ui selection dropdown">
                  <input type="hidden" name="gender" />
                  <i class="dropdown icon"></i>
                  <div class="default text">Gender</div>
                  <div class="menu">
                    <div class="item" data-value="2">Abe</div>
                    <div class="item" data-value="1">Male</div>
                    <div class="item" data-value="0">Female</div>
                  </div>
                </div>
            </div>
        );
    }
}

export default Header