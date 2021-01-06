import { CollectionJSON, CollectionMongo, CollectionMySQL } from './collection'
// types
import {
    DBController as DBControllerInterface,
    Collection,
    DatabaseType,
} from './types'

class DBController implements DBControllerInterface {
    dbType: DatabaseType

    constructor(dbType: DatabaseType) {
        this.dbType = dbType
    }

    getCollection(name: string): Collection {
        switch (this.dbType) {
            case DatabaseType.MONGO:
                return new CollectionMongo(name)
            case DatabaseType.MYSQL:
                return new CollectionMySQL(name)
            default:
                return new CollectionJSON(name)
        }
    }
}

export default DBController
