'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import { RiMenuFold2Fill } from "react-icons/ri";
import { usePathname, useRouter } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getLengthItemsFromCart, getProfile, logout } from './api';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateCart } from '@/store/features/cartSlice';



const Header = () => {
    const router = useRouter()
    const dispath = useDispatch()
    const pathName = usePathname();
    const [name, setName] = useState<string | null>(null)
    const cartItems = useSelector((state: RootState) => state.cart.amount)

    const fetchData = async () => {
        const [nameData, cartData] = await Promise.all([getProfile(), getLengthItemsFromCart()])
        if (nameData)
            setName(nameData?.user?.name)
        if (cartData) dispath(updateCart(cartData.cartItems.length))
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleLogout = async () => {
        const res = await logout()
        if (res) {
            setName(null)
            dispath(updateCart(0))
            router.push("/", { scroll: false })
        }
    }

    return (
        <>
            <div className="flex p-6 h-20 justify-between items-center gap-10 fixed left-0 right-0 top-0 z-10 bg-white">
                <div className="flex justify-between max-w-2xl w-full items-center">
                    <div className="md:hidden">
                        <Sheet >
                            <SheetTrigger><div className="h-8 text-2xl mr-2 flex items-center"><RiMenuFold2Fill /></div></SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader> <SheetTitle className="text-primary1 text-3xl">Menu</SheetTitle></SheetHeader>
                                <SheetDescription></SheetDescription>
                                <div className="text-lg font-semibold flex flex-col gap-2">
                                    <Link href="/" className={`${pathName == "/" ? "text-primary1" : ""}`}>Home</Link>
                                    <Link href="/product" className={`${pathName == "/product" ? "text-primary1" : ""}`}>Product</Link>
                                    <Link href="/" className={`${pathName == "/blogs" ? "text-primary1" : ""}`}>Blogs</Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <Link href="/">
                        <Image
                            src="/logo.webp"
                            alt="logo"
                            width={160}
                            height={32}
                            priority
                            className="h-8 w-40"
                        />
                    </Link>
                    <div className="text-lg font-semibold md:flex hidden gap-6">
                        <Link href="/" className={`${pathName == "/" ? "text-primary1" : ""}`}>Home</Link>
                        <Link href="/product" className={`${pathName == "/product" ? "text-primary1" : ""}`}>Product</Link>
                        <Link href="/" className={`${pathName == "/blogs" ? "text-primary1" : ""}`}>Blogs</Link>
                    </div>
                </div>
                <div className="flex gap-4 text-2xl">
                    {
                        name &&

                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-lg text-primary1 font-medium">{name}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="text-base !text-primary1 font-normal" onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    {!name && <Link href="/login"> <AiOutlineLogin /></Link>}
                    <div className="relative">
                        <Link href="/cart"> <AiOutlineShoppingCart /></Link>
                        <span className="text-white bg-primary1 text-sm w-5 h-5 flex justify-center items-center p-[2px] rounded-full absolute -top-[10px] -right-[10px]">{cartItems}</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header