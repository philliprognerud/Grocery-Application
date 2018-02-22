import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div>
                <h2 className="ui icon header">
                  <i className="settings icon"></i>
                  <div className="content">
                    Account Settings
                    <div className="sub header">Manage your account settings and set e-mail preferences.</div>
                  </div>
                </h2>
            </div>
        );
    }
}

export default Header