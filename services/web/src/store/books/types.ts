import { Book } from '@bookstore/shared/index'

export type { Book } from '@bookstore/shared/index'

export interface BookState {
    Books: Book[]
}

export const LOAD_BOOKS = 'LOAD_BOOKS'
export const RESET_BOOKS = 'RESET_BOOKS'

interface LoadBooks {
    type: typeof LOAD_BOOKS
    payload: Book[]
}

interface ResetBooks {
    type: typeof RESET_BOOKS
}

export type BookActionTypes = LoadBooks | ResetBooks
