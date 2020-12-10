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
}

interface Item {
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
    code: string
    percentage: number
    expiration: Date
    email: () => void
}

interface Transaction {
    timeDate: Date
    userId: string
    items: Item[]
}

interface ShoppingCart {
    items: Item[]
    promotionAdded: boolean
    addPromotion: () => boolean
    checkout: () => void
    addItem: () => void
    removeItem: () => void
    email: () => void
}
