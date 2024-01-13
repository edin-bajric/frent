export type Movie1 = {
    id: string,
    title: string, 
    price: number,
    isAvailable: boolean,
    description: string, 
    dueDate: string,
    isRented: boolean
}

export type Movie = {
    id: string,
    title: string,
    description: string,
    smallImage: string,
    bigImage: string,
    director: string,
    genre: string,
    year: number,
    available: boolean,
    rentalPrice: number
}

export type Notification = {
    message: string
}