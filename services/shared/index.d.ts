export interface User {
    [key: string]: unknown
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

export interface Customer extends User {
    isMember: boolean
    cart: ShoppingCart
}

export interface Item {
    [key: string]: unknown
    id: string
    barcode: number
    price: number
    reorder: boolean
    reorderAmount: number
    stock: number
}

export interface Inventory {
    items: Item
    purchaseItem: () => boolean
    addItem: () => void
    reorder: () => void
    email: () => void
}

export interface Book extends Item {
    title: string
    author: string
}

export interface Promotion {
    id: string
    code: string
    percentage: number
    expiration: Date
    email: () => void
}

export interface Transaction {
    id: string
    userId: string
    timeDate: Date
    items: Item[]
}

export interface ShoppingCart {
    customerId: string
    items: Item[]
    promotionAdded: boolean
    addPromotion: () => boolean
    checkout: () => void
    addItem: () => void
    removeItem: () => void
    email: () => void
}

export interface DBTables {
    customers: Customer[]
    managers: Manager[]
    books: Book[]
    promotions: Promotion[]
    inventory: Inventory
    transactions: Transaction[]
    shoppingCart: ShoppingCart[]
}
