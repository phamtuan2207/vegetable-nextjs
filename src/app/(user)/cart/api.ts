export const getItemsFromCart = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const tokenResponse = await fetch(`${apiUrl}/api/auth/token`)
    const tokenData = await tokenResponse.json()
    const token = tokenData.token
    if (token) {
        const res = await fetch(`${apiUrl}/api/cart/userId`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })

        const cartItems = await res.json();
        return cartItems;
    }
    return null
}

export const deleteCartItem = async (cartId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const tokenResponse = await fetch(`${apiUrl}/api/auth/token`)
    const tokenData = await tokenResponse.json()
    const token = tokenData.token
    if (token) {
        const res = await fetch(`${apiUrl}/api/cart/userId`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                cartId: cartId,
            }),
        })

        const cartItems = await res.json();
        return cartItems;
    }
    return null
}

export const payment = async (products: any[], amount: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const tokenResponse = await fetch(`${apiUrl}/api/auth/token`)
    const tokenData = await tokenResponse.json()
    const token = tokenData.token
    if (token) {
        const res = await fetch(`${apiUrl}/api/payment/payment`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                products,
                amount
            }),
        })

        const result = await res.json();
        return result;
    }
    return null
}