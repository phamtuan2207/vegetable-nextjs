export const logout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const res = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST"
    })
    return res.json()
}

export const getProfile = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const tokenResponse = await fetch(`${apiUrl}/api/auth/token`)
    const tokenData = await tokenResponse.json()
    const token = tokenData.token
    if (token) {
        const res = await fetch(`${apiUrl}/api/auth/login`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!res.ok && res.status == 401) {
            // throw new Error("Failed to fetch profile");
            const logoutResponse = await logout()
        }

        const profileData = await res.json();
        return profileData;
    }
    return null
}



export const addToCart = async (id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const tokenResponse = await fetch(`${apiUrl}/api/auth/token`)
    const tokenData = await tokenResponse.json()
    const token = tokenData.token
    if (token) {
        const res = await fetch(`${apiUrl}/api/cart`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                productId: id
            }),
        })

        const profileData = await res.json();
        return profileData;
    }
    return null
}

export const getLengthItemsFromCart = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const tokenResponse = await fetch(`${apiUrl}/api/auth/token`)
    const tokenData = await tokenResponse.json()
    const token = tokenData.token
    if (token) {
        const res = await fetch(`${apiUrl}/api/cart`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })

        const cartItems = await res.json();
        return cartItems;
    }
    return null
}


