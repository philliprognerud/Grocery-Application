import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div>
                <button className="ui primary button">
                  Save Button
                </button>
                <button className="ui button">
                  Discard
                </button>
            </div>
        )
    }
}

export default Header