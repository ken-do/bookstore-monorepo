import { CRUDRouter } from '../helpers'

const router = new CRUDRouter('transactions')

// Override the router's methods by doing the following
// router.get('/',() => {})
// router.post('/',() => {})
// router.put('/',() => {})
// router.patch('/',() => {})
// router.remove('/',() => {})

export default router.router
