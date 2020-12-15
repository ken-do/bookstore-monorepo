import axios from 'axios'
import { BASE_URL } from '../config'
import testDB from '@bookstore/api/json/bookstore-db-test.json'

const api = axios.create({
    baseURL: BASE_URL,
})

const dbManagers = testDB.managers
const pathnameManagers = '/managers'

const mockUser = {
    email: 'sbackwell0@jimdo.com',
    password: 'IBSwifb8qCT5',
    displayName: 'Sidney Backwell',
    lastActivity: '12/28/2019',
    postalAddress: '3 4th Avenue',
    loggedIn: true,
}

describe('CRUDRouter', () => {
    it('returns the list of managers in database with GET request', async (done) => {
        const { data: managerList } = await api.get(`${pathnameManagers}`)
        expect(managerList).toStrictEqual(dbManagers)
        done()
    })

    it('returns that a manager data by sending a GET request with a valid id', async (done) => {
        const { data: firstUser } = await api.get(
            `${pathnameManagers}/${dbManagers[0].id}`
        )
        expect(firstUser).toStrictEqual(dbManagers[0])
        done()
    })

    it('adds a new manager to the database with POST request', async (done) => {
        const { data: prevUserList } = await api.get(`${pathnameManagers}`)
        await api.post(`${pathnameManagers}`, mockUser)
        const { data: currentUserList } = await api.get(`${pathnameManagers}`)
        expect(currentUserList.length).toBe(prevUserList.length + 1)
        done()
    })

    it('updates a manager data with a PATCH request', async (done) => {
        let { data: managerList } = await api.get(`${pathnameManagers}`)
        const lastUser = managerList[managerList.length - 1]
        const nextDisplayName = 'New Display Name'
        const { data: updatedLastUser } = await api.patch(
            `${pathnameManagers}/${lastUser.id}`,
            {
                displayName: nextDisplayName,
            }
        )
        expect(updatedLastUser.displayName).toBe(nextDisplayName)
        expect(updatedLastUser.email).toBe(lastUser.email)
        done()
    })

    it('replaces a manager data with a PUT request', async (done) => {
        let { data: managerList } = await api.get(`${pathnameManagers}`)
        const lastUser = managerList[managerList.length - 1]
        const nextDisplayName = 'New Display Name'
        const { data: updatedLastUser } = await api.put(
            `${pathnameManagers}/${lastUser.id}`,
            {
                displayName: nextDisplayName,
            }
        )
        expect(updatedLastUser.displayName).toBe(nextDisplayName)
        expect(updatedLastUser.email).toBeUndefined()
        done()
    })

    it('removes a manager with a DELETE request', async (done) => {
        let { data: managerList } = await api.get(`${pathnameManagers}`)
        const lastUser = managerList[managerList.length - 1]
        await api.delete(`${pathnameManagers}/${lastUser.id}`)
        const { data: updatedUserList } = await api.get(`${pathnameManagers}`)
        expect(updatedUserList.length).toBe(managerList.length - 1)
        done()
    })
})
