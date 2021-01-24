import React, { useCallback, useState } from 'react'
import { Card } from 'antd'
import styles from './Book.module.css'

interface Props {
    id: string
    title: string
    author: string
    price: number
    onSelect: (id: string) => void
    onDeselect: (id: string) => void
}

const Book = ({
    id,
    title,
    author,
    price,
    onSelect,
    onDeselect,
}: Props): JSX.Element => {
    const [isSelected, setIsSelected] = useState(false)

    const handleClick = useCallback(() => {
        if (isSelected) {
            setIsSelected(false)
            onDeselect(id)
        } else {
            setIsSelected(true)
            onSelect(id)
        }
    }, [onSelect, onDeselect, id, isSelected])

    return (
        <div
            className={isSelected ? styles.bookSelected : styles.book}
            onClick={handleClick}
        >
            <Card title={title} bordered={false}>
                <p>Author: {author}</p>
                <p>Price: {price}</p>
            </Card>
        </div>
    )
}

export default Book
