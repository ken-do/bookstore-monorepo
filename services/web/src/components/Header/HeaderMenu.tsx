import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

const HeaderMenu = () => {
    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
                <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/register">Register</Link>
            </Menu.Item>
        </Menu>
    )
}

export default HeaderMenu
