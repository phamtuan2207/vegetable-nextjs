'use client'
import { useEffect, useState } from "react"
import { getProductByCategory, getProductById } from "./api"
import Link from "next/link"
import { FaChevronRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/product";
import { useRouter } from "next/navigation"
import RelatedProducts from "@/components/related-product"
import { addToCart } from "../../header/api";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "@/store/features/cartSlice";
import { RootState } from "@/store/store";


export default function DetailProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<IProduct>()
    const [relatedProducts, setRelatedProducts] = useState<IProduct[] | null>(null)
    const router = useRouter()
    const { toast } = useToast()
    const dispath = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.amount)

    const fetchData = async () => {
        const response = await getProductById(params.id)
        const relatedProducts = await getProductByCategory(response.product.category)
        setProduct(response.product)
        setRelatedProducts(relatedProducts.products)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleAddToCart = async () => {
        const data = await addToCart(params.id)
        if (data) {
            if (data.statusCode == 200) {
                toast({
                    description: data.message,
                    className: 'text-red-500'
                })
            }

            if (data.statusCode == 201) {
                toast({
                    description: data.message,
                    className: 'text-primary1'
                })
                dispath(updateCart(cartItems + 1))
            }
        }
        else {
            router.push('/login', { scroll: true })
        }
    }

    return (
        <div className='max-w-7xl mx-auto xl:px-0 px-4'>
            <div className='flex gap-2 font-semibold items-center mt-8'>
                <Link href='/' className='hover:text-primary1'>Home</Link>
                <FaChevronRight />
                {product &&
                    <h2 className=' capitalize text-primary1'>{product.name}</h2>
                }
            </div>
            {

                product &&
                <div className='flex flex-wrap p-10 border-[1px] border-primary1 my-10 items-center rounded-lg relative'>
                    <div className=' absolute top-4 left-4'>
                        <Button onClick={() => router.back()} className="bg-primary1 hover:bg-primary1/90 text-white">Go back</Button>
                    </div>
                    <div className='md:w-1/2 w-full sm:p-10 p-4'>
                        <img src={product.image} className='w-full' />
                    </div>
                    <div className='md:w-1/2 w-full sm:p-10 p-4'>
                        <h3 className='font-bold text-xl mb-3 capitalize text-primary1'>{product.name}</h3>

                        <div className='w-full h-[1px] bg-primary1 my-6'></div>
                        <span className='font-semibold'>Category: {` ${product.category}`}</span>
                        <div className='w-full h-[1px] bg-primary1 my-6'></div>
                        <span className='font-semibold'>Quality Sold: {` ${product.quantitySold}`}</span>
                        <div className='w-full h-[1px] bg-primary1 my-6'></div>
                        <span className='font-semibold'>Stock: {` ${product.stock}`}</span>
                        <div className='mt-4 flex gap-4'>
                            <Button className="bg-primary1 hover:bg-primary1/90 text-white" onClick={handleAddToCart}>Add to cart</Button>
                        </div>
                    </div>
                </div>
            }
            <div className="my-10">
                <h2 className="text-primary1 capitalize text-2xl font-bold mb-10 ">related products</h2>
                {
                    relatedProducts &&
                    <RelatedProducts products={relatedProducts} />
                }
            </div>
        </div>
    )
}
