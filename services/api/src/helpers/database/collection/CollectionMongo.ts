import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

import { Collection, CollectionItem, Database } from '../types'

const DATABASE_FILE_NAME = 'bookstore-db.json'

class CollectionMongo implements Collection {
    name: string
    constructor(name: string) {
        this.name = name
    }

    getAll(): CollectionItem[] {
        const bufferData = fs.readFileSync(DATABASE_FILE_NAME)
        const database = JSON.parse(bufferData.toString()) as Database
        return database.managers
    }

    getById(id: string): CollectionItem {
        const bufferData = fs.readFileSync(DATABASE_FILE_NAME)
        const database = JSON.parse(bufferData.toString()) as Database
        const item = database[this.name].find(
            (item) => item && id === item.id
        ) as CollectionItem
        return item
    }

    create(data: Omit<CollectionItem, 'id'>): CollectionItem {
        if (data) {
            const bufferData = fs.readFileSync(DATABASE_FILE_NAME)
            const database = JSON.parse(bufferData.toString()) as Database
            const collection = database[this.name]
            const id: string = uuidv4()
            const item = {
                id,
                ...data,
            } as CollectionItem
            collection.push(item)
            database[this.name] = collection
            fs.writeFileSync(DATABASE_FILE_NAME, JSON.stringify(database))
            return item
        }

        return null
    }

    update(id: string, data: Partial<CollectionItem> = {}): CollectionItem {
        const bufferData = fs.readFileSync(DATABASE_FILE_NAME)
        const database = JSON.parse(bufferData.toString()) as Database
        let collection = database[this.name]
        const existingItem = collection.find(
            (collectionItem) => collectionItem && collectionItem.id === id
        ) as CollectionItem

        let updatedItem = existingItem ?? null

        if (existingItem) {
            const index = collection.indexOf(existingItem)
            updatedItem = { ...existingItem, ...data }
            collection = collection.splice(index, 1, updatedItem)
            database[this.name] = collection
            fs.writeFileSync(DATABASE_FILE_NAME, JSON.stringify(database))
        } else {
            console.error(`The item with id ${id} does not exist`)
        }

        return updatedItem
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

    remove(id: string): CollectionItem {
        const bufferData = fs.readFileSync(DATABASE_FILE_NAME)
        const database = JSON.parse(bufferData.toString()) as Database
        let collection = database[this.name]
        const existingItem = collection.find(
            (collectionItem) => collectionItem && collectionItem.id === id
        ) as CollectionItem

        if (existingItem) {
            const index = collection.indexOf(existingItem)
            collection = collection.splice(index, 1)
            database[this.name] = collection
            fs.writeFileSync(DATABASE_FILE_NAME, JSON.stringify(database))
            return existingItem
        } else {
            console.error(`The item with id ${id} does not exist`)
            return null
        }
    }
}

export default CollectionMongo
