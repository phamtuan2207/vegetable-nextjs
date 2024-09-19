import { addToCart } from '@/app/(user)/header/api';
import { IProduct } from '@/interface/product'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToast } from './ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCart } from '@/store/features/cartSlice';

const CardProduct = ({ product }: { product: IProduct }) => {
    const router = useRouter()
    const { toast } = useToast()

    const dispath = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.amount)

    const handleAddToCart = async () => {
        const data = await addToCart(product._id)
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
        <>
            <div className='relative group'>
                <Link href={`/product/${product._id}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        priority
                        className='w-full h-auto rounded-md'
                    />
                </Link>
                <div className='absolute right-4 text-lg p-4 rounded-full opacity-0 bg-white hover:bg-primary1 hover:text-white bottom-0 cursor-pointer group-hover:-translate-y-6 transform transition-transform duration-300 group-hover:opacity-100'>
                    <AiOutlineShoppingCart onClick={handleAddToCart} />
                </div>
            </div>
            <Link href={`/product/${product._id}`} className='hover:text-primary1 text-center block capitalize my-4 font-medium text-lg'>{product.name}
            </Link>
            <div >
                {
                    product.discountPercent != 0 ?
                        <div className='flex gap-2 justify-center'>
                            <span className='text-primary3 font-semibold line-through'>${product.price}</span>
                            <span className='text-primary1 font-semibold'>${(product.price * (100 - product.discountPercent) / 100).toFixed(2)}</span>
                        </div>
                        : <h6 className='text-primary1 font-semibold text-center'>${product.price}</h6>
                }
            </div>
        </>
    )
}

export default CardProduct