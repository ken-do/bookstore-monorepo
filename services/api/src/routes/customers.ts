import { CRUDRouter } from '../helpers'
class CustomersRouter extends CRUDRouter {
    constructor(tableName: string) {
        super(tableName)
        this.login()
        this.logout()
    }

    login(): void {
        this.router.post('/login', (req, res) => null)
    }

    logout(): void {
        this.router.post('/logout', (req, res) => null)
    }
}

const router = new CustomersRouter('customers')

export default router.router
