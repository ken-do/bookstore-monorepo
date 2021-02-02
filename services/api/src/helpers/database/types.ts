import { Item, User } from '@bookstore/shared'

export type CollectionItem = Item | User
export type NullableCollectionItem = Item | User | null

export interface Collection {
    name: string
    getAll: () => CollectionItem[]
    getById: (id: string) => NullableCollectionItem
    create: (data: CollectionItemData) => NullableCollectionItem
    update: (
        id: string,
        data: CollectionItemData,
        override?: boolean
    ) => NullableCollectionItem
    createOrUpdate?: (data: Partial<CollectionItem>) => NullableCollectionItem
    remove: (id: string) => NullableCollectionItem
    query: (queryObject: QueryObject) => NullableCollectionItem
}

export interface DBController {
    dbType: DatabaseType
    getCollection: (collectionName: string) => Collection
}

export interface Database {
    [key: string]: CollectionItem[]
}

export enum DatabaseType {
    JSON,
    MONGO,
    MYSQL,
}

export type CollectionItemData = Partial<Omit<CollectionItem, 'id'>>

export enum QueryMode {
    AND = 1,
    OR = 2,
}

export type QueryObject = CollectionItemData & { qm?: QueryMode }
