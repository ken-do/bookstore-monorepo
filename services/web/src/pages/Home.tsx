import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BookList } from '../components'
import { fetchBooks } from '../store/slice/books'
import { RootState } from '../store/rootReducer'

const Home = () => {
    const { booksById, bookIds } = useSelector(
        (state: RootState) => state.books
    )

    const dispatch = useDispatch()
    useEffect(() => {
        if (!bookIds.length) {
            dispatch(fetchBooks())
        }
    }, [dispatch, bookIds])

    const books = bookIds.map((id) => booksById[id])

    return <BookList books={books} />
}

export default Home
