export default async function getProducts(productName: string | null, page: number) {
    const query = new URLSearchParams();
    if (productName) {
        query.append('productName', productName);
    }
    query.append('page', page.toString());
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product?${query}`)
    return res.json();
}