import React, { useCallback, useState } from 'react'
import { Col, Row } from 'antd'

import { Book as BookType } from '@bookstore/shared/index'

import Book from './Book'

interface Props {
    books: BookType[]
}

const BookList = ({ books }: Props) => {
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
