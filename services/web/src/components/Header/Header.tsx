import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'

import HeaderMenu from './HeaderMenu'
import HeaderSearch from './HeaderSearch'
import HeaderCart from './HeaderCart'

import styles from './Header.module.css'

const { Header: AntdHeader } = Layout

const Header = () => {
    return (
        <AntdHeader>
            <div className={styles.headerLeft}>
                <Link to="/">Home</Link>
                <HeaderSearch />
            </div>
            <div className={styles.headerRight}>
                <HeaderMenu />
                <HeaderCart />
            </div>
        </AntdHeader>
    )
}

export default Header
