import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div>
                <button class="ui primary button">
                  Save
                </button>
                <button class="ui button">
                  Discard
                </button>
            </div>
        )
    }
}

export default Header