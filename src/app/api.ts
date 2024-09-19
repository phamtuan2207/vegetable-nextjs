export const getBanner = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const bannerResponse = await fetch(`${apiUrl}/api/banner`)
    return bannerResponse.json()
}

export const getBestSeller = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const sellerRessponse = await fetch(`${apiUrl}/api/product/seller`)
    return sellerRessponse.json()
}