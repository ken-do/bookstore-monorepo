import React, { useState } from 'react'
import { Button, Popover } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

const HeaderCart = () => {
    const [isCartVisible, setIsCartVisible] = useState(false)

    return (
        <Popover
            content={<div onClick={() => setIsCartVisible(false)}>Close</div>}
            title="Title"
            trigger="click"
            visible={isCartVisible}
            onVisibleChange={(isCartVisible) => setIsCartVisible(isCartVisible)}
        >
            <Button
                type="primary"
                shape="circle"
                icon={<ShoppingCartOutlined />}
                size="large"
            />
        </Popover>
    )
}

export default HeaderCart
