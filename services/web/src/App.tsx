//
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Layout } from 'antd'
import { RouteRenderer, Header } from './components'
import styles from './App.module.css'

const { Content } = Layout

const App = () => {
    return (
        <Router>
            <Layout className="layout">
                <Header />
                <Content style={{ padding: '0 50px' }}>
                    <div className={styles.siteLayoutContent}>
                        <RouteRenderer />
                    </div>
                </Content>
            </Layout>
        </Router>
    )
}

export default App
