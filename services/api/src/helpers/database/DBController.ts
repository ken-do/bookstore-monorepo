import { CollectionJSON, CollectionMongo, CollectionMySQL } from './collection'
// types
import {
    DBController as DBControllerInterface,
    Collection,
    DatabaseTypes,
} from './types'

class DBController implements DBControllerInterface {
    dbType: DatabaseTypes

    constructor(dbType: DatabaseTypes) {
        this.dbType = dbType
    }

    getCollection(name: string): Collection {
        switch (this.dbType) {
            case DatabaseTypes.MONGO:
                return new CollectionMongo(name)
            case DatabaseTypes.MYSQL:
                return new CollectionMySQL(name)
            default:
                return new CollectionJSON(name)
        }
    }
}

export default DBController
