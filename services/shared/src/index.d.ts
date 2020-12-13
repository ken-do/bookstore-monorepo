interface User {
    id: string
    password: string
    email: string
    lastActivity: Date
    postalAddress: string
    displayName: string
    loggedIn: boolean
    login: () => boolean
    logout: () => boolean
}

type Manager = User

interface Customer extends User {
    isMember: boolean
    cart: ShoppingCart
}

interface Item {
    id: string
    barcode: number
    price: number
    reorder: boolean
    reorderAmount: number
    stock: number
}

interface Inventory {
    items: Item
    purchaseItem: () => boolean
    addItem: () => void
    reorder: () => void
    email: () => void
}

interface Book extends Item {
    title: string
    author: string
}

interface Promotion {
    id: string
    code: string
    percentage: number
    expiration: Date
    email: () => void
}

interface Transaction {
    id: string
    userId: string
    timeDate: Date
    items: Item[]
}

interface ShoppingCart {
    customerId: string
    items: Item[]
    promotionAdded: boolean
    addPromotion: () => boolean
    checkout: () => void
    addItem: () => void
    removeItem: () => void
    email: () => void
}
