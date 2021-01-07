import { Home, Login, Register } from '../pages'

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/',
        component: Home,
    },
]

export default routes
