import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import appRoot from 'app-root-path'
import { Collection, CollectionItem, Database } from '../types'
import { JSON_DB_NAME } from '../../config'

class CollectionMongo implements Collection {
    name: string
    dbPathname: string
    constructor(name: string, fileName: string = JSON_DB_NAME) {
        this.name = name
        this.dbPathname = path.join(
            appRoot.path,
            'services',
            'api',
            'json',
            `${fileName}.json`
        )
    }

    getDatabase(): Database {
        const bufferData = fs.readFileSync(this.dbPathname)
        const database = JSON.parse(bufferData.toString()) as Database
        return database
    }

    updateDatabase(database: Database): void {
        fs.writeFileSync(this.dbPathname, JSON.stringify(database))
    }

    getAll(): CollectionItem[] {
        const database = this.getDatabase()
        return database[this.name] ?? []
    }

    getById(id: string): CollectionItem {
        const database = this.getDatabase()
        const item =
            database[this.name].find((item) => item && id === item.id) ?? null
        return item
    }

    create(data: Omit<CollectionItem, 'id'>): CollectionItem {
        if (data) {
            const database = this.getDatabase()
            const collection = database[this.name]
            const id: string = uuidv4()
            const item = {
                id,
                ...data,
            } as CollectionItem
            collection.push(item)
            database[this.name] = collection
            this.updateDatabase(database)
            return item
        }

        return null
    }

    update(
        id: string,
        data: Partial<CollectionItem> = {},
        override = false
    ): CollectionItem {
        const database = this.getDatabase()
        const collection = database[this.name]
        const existingItem = collection.find(
            (collectionItem) => collectionItem && collectionItem.id === id
        )

        if (existingItem) {
            const updatedItem = override
                ? ({ id: existingItem.id, ...data } as CollectionItem)
                : ({ ...existingItem, ...data } as CollectionItem)
            const index = collection.indexOf(existingItem)
            collection.splice(index, 1, updatedItem)
            database[this.name] = collection
            this.updateDatabase(database)
            return updatedItem
        } else {
            console.error(`The item with id ${id} does not exist`)
        }

        return null
    }

    createOrUpdate(data: Partial<CollectionItem>): CollectionItem {
        let item = null
        if (data) {
            if (!data.id) {
                item = this.create(data)
            } else {
                const id = data.id
                delete data.id
                item = this.update(id, data)
            }
        }

        return item
    }

    remove(id: string | string[]): CollectionItem {
        const database = this.getDatabase()
        const collection = database[this.name]
        const ids = typeof id === 'string' ? [id] : id
        for (const itemId of ids) {
            const existingItem = collection.find(
                (collectionItem) =>
                    collectionItem && collectionItem.id === itemId
            ) as CollectionItem
            if (existingItem) {
                const index = collection.indexOf(existingItem)
                const removedItem = collection.splice(index, 1)
                database[this.name] = collection
                this.updateDatabase(database)
                return removedItem[0]
            } else {
                console.error(`The item with id ${itemId} does not exist`)
            }
        }
        return null
    }
}

export default CollectionMongo
