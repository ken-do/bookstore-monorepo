import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Input, Button, Popover } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import styles from './Header.module.css'

const { Header: AntdHeader } = Layout

const { Search } = Input

const Header = () => {
    const [isCartVisible, setIsCartVisible] = useState(true)

    return (
        <AntdHeader>
            <div className={styles.headerLeft}>
                <Link to="/">Home</Link>
                <Search
                    placeholder="input search text"
                    onSearch={(value) => console.log(value)}
                    enterButton
                />
            </div>
            <div className={styles.headerRight}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                >
                    <Menu.Item key="1">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/register">Register</Link>
                    </Menu.Item>
                </Menu>
                <Popover
                    content={
                        <a onClick={() => setIsCartVisible(false)}>Close</a>
                    }
                    title="Title"
                    trigger="click"
                    visible={isCartVisible}
                    onVisibleChange={(isCartVisible) =>
                        setIsCartVisible(isCartVisible)
                    }
                >
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ShoppingCartOutlined />}
                        size="large"
                    />
                </Popover>
            </div>
        </AntdHeader>
    )
}

export default Header
