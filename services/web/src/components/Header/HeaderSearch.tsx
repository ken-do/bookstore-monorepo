import React from 'react'
import { Input } from 'antd'

const { Search } = Input

const HeaderSearch = () => {
    return (
        <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            enterButton
        />
    )
}

export default HeaderSearch
