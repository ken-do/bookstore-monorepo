import { Item, User } from '@bookstore/shared'

export type CollectionItem = Item | User | null
export interface Collection {
    name: string
    getAll: () => CollectionItem[]
    getById: (id: string) => CollectionItem
    create: (data: Omit<CollectionItem, 'id'>) => CollectionItem
    update: (
        id: string,
        data: Partial<CollectionItem>,
        override?: boolean
    ) => CollectionItem
    createOrUpdate?: (data: Partial<CollectionItem>) => CollectionItem
    remove: (id: string) => CollectionItem
}

export interface DBController {
    dbType: DatabaseTypes
    getCollection: (collectionName: string) => Collection
}

export interface Database {
    [key: string]: CollectionItem[]
}

export enum DatabaseTypes {
    JSON,
    MONGO,
    MYSQL,
}
