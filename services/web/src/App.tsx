import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import styles from './App.module.css'
import axios from 'axios'

function App() {
    const [greeting, setGreeting] = useState('Hello World')
    useEffect(() => {
        axios.get('http://localhost:5000/').then((response) => {
            const { message } = response.data
            if (message) {
                setGreeting(message)
            }
        })
    }, [])

    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <img src={logo} className={styles.appLogo} alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className={styles.appLink}
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {greeting}
                </a>
            </header>
        </div>
    )
}

export default App
