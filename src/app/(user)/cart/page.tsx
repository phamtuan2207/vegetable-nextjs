"use client"

import React, { useEffect, useRef, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { deleteCartItem, getItemsFromCart, payment } from './api'
import { AiFillDelete } from "react-icons/ai";
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCart } from '@/store/features/cartSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CartPage = () => {
    const { toast } = useToast()
    const cartItems = useSelector((state: RootState) => state.cart.amount)
    const dispath = useDispatch()
    const amountRef = useRef<number[]>([])
    const [totalPrice, setTotalPrice] = useState(0)

    const [datas, setDatas] = useState([])
    const fetchData = async () => {
        const data = await getItemsFromCart()
        amountRef.current = data.cartItems.map(() => 0)
        setDatas(data.cartItems)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id: string) => {
        const deleteResponse = await deleteCartItem(id)
        if (deleteResponse) {
            toast({
                description: deleteResponse.message,
                className: "text-primary1"
            })
            dispath(updateCart(cartItems - 1))
            setDatas((prevArray) => prevArray.filter((item: any) => item._id !== id));
        }
    }
    const handleQuantityChange = (index: number, value: string) => {
        amountRef.current[index] = Number(value)
        setTotalPrice(calculateTotal())
    };

    const calculateTotal = () => {
        return datas.reduce((total, data: any, index) => {
            return total + data.productId.price * amountRef.current[index];
        }, 0);
    };

    const handlePay = () => {
        if (totalPrice == 0) {
            toast({
                title: "Please change amount",
                className: 'text-red-700'
            })
        }
        else {
            const products = datas
                .map((data: any, index) => ({
                    name: data.productId.name,
                    amount: amountRef.current[index],
                }))
                .filter((product) => product.amount !== 0);
            const amount = String(totalPrice * 23000)
            payment(products, amount)
                .then(res => {
                    window.location.href = res.shortLink
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div className="my-10 min-h-screen">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Product Name</TableHead>
                        <TableHead className="md:block hidden leading-[48px]">Image</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {datas && datas.length > 0 && datas.map((data: any, index) => (
                        <TableRow key={data._id}>
                            <TableCell className="font-medium capitalize">{data.productId.name}</TableCell>
                            <TableCell className="font-medium md:block hidden">
                                <img src={data.productId.image} alt="product" className="h-20 w-auto" />
                            </TableCell>
                            <TableCell className="font-medium">{data.productId.price}</TableCell>
                            <TableCell className="font-medium">
                                <Input type='number' className='w-20'
                                    min={0}
                                    value={amountRef.current[index]}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                />
                            </TableCell>
                            <TableCell className="text-red-700 text-2xl relative">
                                <AiFillDelete className="absolute right-3 top-1/2 translate-y-[-50%]" onClick={() => handleDelete(data._id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell>${totalPrice}</TableCell>
                        <TableCell className="text-right">
                            <Button className="bg-primary1 hover:bg-primary1/90" onClick={handlePay}>Pay</Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default CartPage