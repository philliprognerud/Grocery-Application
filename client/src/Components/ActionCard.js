import React, { Component } from 'react'

class ActionCard extends Component {
    render() {
        return (
            <div>
                <button className="ui primary button">
                  Save
                </button>
                <button className="ui button">
                  Discard
                </button>
            </div>
        )
    }
}

export default ActionCard