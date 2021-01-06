import express, { Router } from 'express'
import DBController from '../database/DBController'
import { DatabaseType, Collection, CollectionItem } from '../database/types'
import { RequestMethods, CRUDRouter as CRUDRouterInterface } from './types'

const defaultAllowedMethods = [
    RequestMethods.GET,
    RequestMethods.POST,
    RequestMethods.PUT,
    RequestMethods.PATCH,
    RequestMethods.DELETE,
]

const defaultDatabaseType = DatabaseType.JSON

class CRUDRouter implements CRUDRouterInterface {
    router: Router
    db: DBController
    collection: Collection
    allowedMethods: RequestMethods[]

    constructor(
        tableName: string,
        allowedMethods: RequestMethods[] = defaultAllowedMethods,
        databaseType: DatabaseType = defaultDatabaseType
    ) {
        this.router = express.Router()
        this.db = new DBController(databaseType)
        this.collection = this.db.getCollection(tableName)
        this.allowedMethods = allowedMethods
        this.initialize()
    }

    initialize(): void {
        for (const method of this.allowedMethods) {
            this[method]()
        }
    }

    [RequestMethods.GET](): void {
        this.router.get('/', (req, res) => {
            res.send(this.collection.getAll())
        })
        this.router.get('/:id', (req, res) => {
            const id = req.params.id
            res.send(this.collection.getById(id))
        })
    }

    [RequestMethods.POST](): void {
        this.router.post('/', (req, res) => {
            const data = req.body as Omit<CollectionItem, 'id'>
            res.send(this.collection.create(data))
        })
    }

    [RequestMethods.PUT](): void {
        this.router.put('/:id', (req, res) => {
            const id = req.params.id
            const data = req.body as Partial<CollectionItem>
            res.send(this.collection.update(id, data, true))
        })
    }

    [RequestMethods.PATCH](): void {
        this.router.patch('/:id', (req, res) => {
            const id = req.params.id
            const data = req.body as Partial<CollectionItem>
            res.send(this.collection.update(id, data))
        })
    }

    [RequestMethods.DELETE](): void {
        this.router.delete('/:id', (req, res) => {
            const id = req.params.id
            res.send(this.collection.remove(id))
        })
    }
}

export default CRUDRouter
