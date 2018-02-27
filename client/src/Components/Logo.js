import React, { Component } from 'react';

class Logo extends Component {
    render() {
        return (
            <Link to= '/'>
            //fix img path once available
                <img src = {'../public/logo.png'} />
            </Link>
        );
    }

}

export default Logo;