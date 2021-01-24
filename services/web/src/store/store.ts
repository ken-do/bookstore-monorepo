import { createStore } from 'redux'
import bookReducers from './books/reducers'

const store = createStore({
    books: bookReducers,
})

export default store
