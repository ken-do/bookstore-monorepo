import { Router } from 'express'
import DBController from '../database/DBController'
import { Collection } from '../database/types'

export enum RequestMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

export type CRUDRouter = {
    [key in RequestMethods]: () => void
} & {
    router: Router
    db: DBController
    collection: Collection
    allowedMethods: RequestMethods[]
}
