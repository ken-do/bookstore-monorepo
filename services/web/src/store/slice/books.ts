import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book } from '@bookstore/shared/index'
import { AppThunk } from '../index'

interface BooksState {
    booksById: Record<string, Book>
    bookIds: string[]
    isLoading: boolean
    error: string | null
}

type QueryObject = Partial<Omit<Book, 'id'>>

const booksInitialState: BooksState = {
    booksById: {},
    bookIds: [],
    isLoading: false,
    error: null,
}

function startLoading(state: BooksState) {
    state.isLoading = true
}

function loadingFailed(state: BooksState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const books = createSlice({
    name: 'books',
    initialState: booksInitialState,
    reducers: {
        getBookStart: startLoading,
        getBooksStart: startLoading,
        getBookSuccess(state, { payload }: PayloadAction<Book>) {
            const { id } = payload
            state.booksById[id] = payload
            state.isLoading = false
            state.error = null
        },
        getBooksSuccess(state, { payload: books }: PayloadAction<Book[]>) {
            state.isLoading = false
            state.error = null

            books.forEach((book: Book) => {
                state.booksById[book.id] = book
            })

            books.forEach((book: Book) => {
                state.bookIds.push(book.id)
            })
        },
        getBookFailure: loadingFailed,
        getBooksFailure: loadingFailed,
    },
})

export const {
    getBooksStart,
    getBooksSuccess,
    getBookStart,
    getBookSuccess,
    getBookFailure,
    getBooksFailure,
} = books.actions

export default books.reducer

export const fetchBooks = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getBooksStart())
        const { data: books } = await axios.get('http://localhost:5000/books')
        dispatch(getBooksSuccess(books))
    } catch (err) {
        dispatch(getBooksFailure(err.toString()))
    }
}

export const fetchBook = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(getBookStart())
        const { data: book } = await await axios.get(
            `http://localhost:5000/books/${id}`
        )

        dispatch(getBookSuccess(book))
    } catch (err) {
        dispatch(getBookFailure(err.toString()))
    }
}

export const searchBooks = (queryObj: QueryObject): AppThunk => async (
    dispatch
) => {
    try {
        dispatch(getBookStart())
        const { data: book } = await await axios.get(
            `http://localhost:5000/books`
        )

        dispatch(getBookSuccess(book))
    } catch (err) {
        dispatch(getBookFailure(err.toString()))
    }
}
