import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import Star from './Star'
const Landing = () => <h2>Landing Page</h2>

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header /> 
                    <Route exact path="/phil" component={Landing} />
                    <Route exact path="/dom" component={Star} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App