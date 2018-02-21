import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Header from "./Header"

const Landing = () => <h3>Landing page</h3>
const Footer = () => <h6>Footer </h6>

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/phil" component={Landing} />
                    <Route exact path="/phil/abe" component={Footer} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App