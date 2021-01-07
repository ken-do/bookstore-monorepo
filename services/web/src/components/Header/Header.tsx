import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
    return (
        <nav className={styles.header}>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
