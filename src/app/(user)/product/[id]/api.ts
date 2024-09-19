
export const getProductById = async (id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}/api/product/productId/id?id=${id}`)
    return response.json()
}

export const getProductByCategory = async (category: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}/api/product/category?category=${category}`)
    return response.json()
}