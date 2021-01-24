import React, { useCallback, useState } from 'react'
import Book from './Book'
import { Col, Row } from 'antd'
import books from '../books.json'

const BookList = () => {
    const [selectedBooks, setSelectedBooks] = useState([] as string[])
    const handleSelectBook = useCallback(
        (id) => {
            setSelectedBooks((prevSelectedBooks: string[]) => [
                ...prevSelectedBooks,
                id,
            ])
        },
        [setSelectedBooks]
    )

    const handleDeselectBook = useCallback(
        (id) => {
            setSelectedBooks((prevSelectedBooks: string[]) =>
                prevSelectedBooks.filter((bookId) => bookId !== id)
            )
        },
        [setSelectedBooks]
    )

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {books.map((book) => (
                    <Col key={book.id} span={6}>
                        <Book
                            {...book}
                            onSelect={handleSelectBook}
                            onDeselect={handleDeselectBook}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default BookList
