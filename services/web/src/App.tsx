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
            <Layout className={styles.layout}>
                <Header />
                <Content style={{ padding: '0 50px' }}>
                    <div className={styles.layoutContent}>
                        <RouteRenderer />
                    </div>
                </Content>
            </Layout>
        </Router>
    )
}

export default App
