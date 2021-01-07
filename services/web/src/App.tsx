//
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Header, RouteRenderer } from './components'

function App() {
    return (
        <Router>
            <div>
                <Header />
                <RouteRenderer />
            </div>
        </Router>
    )
}

export default App
