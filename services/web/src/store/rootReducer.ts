import { combineReducers } from '@reduxjs/toolkit'

import booksReducer from './slice/books'

const rootReducer = combineReducers({
    books: booksReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
