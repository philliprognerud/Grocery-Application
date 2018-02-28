import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Logo from './Logo'
import MenuBar from './MenuBar'
const Landing = () => <h2>Landing Page</h2>

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Logo />
                    <Route exact path="/phil" component={Landing} />
                    <Route exact path="/shawn/*" component={MenuBar} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App