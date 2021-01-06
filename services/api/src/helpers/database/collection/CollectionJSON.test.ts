import CollectionJSON from './CollectionJSON'
import { User } from '@bookstore/shared'
import { JSON_DB_NAME } from '../../config'

const mockItem = {
    email: 'sbackwell0@jimdo.com',
    password: 'IBSwifb8qCT5',
    displayName: 'Sidney Backwell',
    lastActivity: '12/28/2019',
    postalAddress: '3 4th Avenue',
    loggedIn: true,
}

describe('CollectionJSON', () => {
    const collection = new CollectionJSON('managers', JSON_DB_NAME)

    it('should allow CREATING a new item', () => {
        const items = collection.getAll()
        const itemsLength = items.length
        const mockItem = {
            email: 'sbackwell0@jimdo.com',
            password: 'IBSwifb8qCT5',
            displayName: 'Sidney Backwell',
            lastActivity: '12/28/2019',
            postalAddress: '3 4th Avenue',
            loggedIn: true,
        }
        collection.create(mockItem)
        expect(collection.getAll().length).toBe(itemsLength + 1)
    })

    it('should allow RETRIEVING a list of all items', () => {
        const items = collection.getAll()
        expect(items.length).toBeDefined()
    })

    it("should allow RETRIEVING one item using that item's id and return null if the item with that id does not exist ", () => {
        const items = collection.getAll()
        const firstItem = items[0]
        expect(collection.getById(firstItem.id)).toBeDefined()
        expect(collection.getById('fake-id')).toBeNull()
    })

    it('should allow RETRIEVING one item using any field whose value is string', () => {
        const items = collection.getAll()
        const firstItem = items[0]
        expect(collection.query({ email: firstItem.email })).toBeDefined()
        expect(collection.query({ email: 'abc@example.com' })).toBeNull()
    })

    it('should allow UPDATING an item', () => {
        const lastItem = collection.getAll().pop() as User
        const newDisplayName = 'New Display Name'
        collection.update(lastItem.id, { displayName: newDisplayName })
        const newLastItem = collection.getAll().pop() as User
        expect(newLastItem.displayName).toBe(newDisplayName)
        expect(newLastItem.email).toBe(lastItem.email)
    })

    it('should allow REPLACING an item', () => {
        const lastItem = collection.getAll().pop()
        const newEmail = 'newemail@example.com'
        collection.update(lastItem.id, { email: newEmail }, true)
        const newLastItem = collection.getAll().pop() as User
        expect(newLastItem.email).toBe(newEmail)
        expect(newLastItem.displayName).toBeUndefined()
    })

    it('should allow REMOVING an item', () => {
        const lastItem = collection.getAll().pop()
        collection.remove(lastItem.id)
        expect(collection.getById(lastItem.id)).toBeNull()
    })
})

export default {}
