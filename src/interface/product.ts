export interface IProduct {
    _id: string,
    image: string,
    name: string,
    price: number,
    discountPercent: number
    stock?: number,
    quantitySold: number
    category?: string
}