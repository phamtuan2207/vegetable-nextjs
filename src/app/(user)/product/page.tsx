'use client'

import CardProduct from '@/components/card-product'
import { Skeleton } from '@/components/ui/skeleton'
import { IProduct } from '@/interface/product'
import React, { useEffect, useState } from 'react'
import getProducts from './api'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from '@/components/ui/input'
import Image from 'next/image'

const ProductPage = () => {

    const [products, setProducts] = useState<IProduct[] | null>(null)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [productName, setProductName] = useState<string | null>(null)


    const fetchData = async () => {
        const productsData = await getProducts(null, 1)
        setProducts(productsData.products)
        setTotalPages(productsData.totalPages)
    }

    useEffect(() => {
        fetchData()
        setIsLoading(false)
    }, [])

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            getProducts(productName, page)
                .then(res => {
                    setProducts(res.products)
                    setCurrentPage(page);
                })
        }
    };


    const handleSearch = (value: string) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Thiết lập timeout mới
        const newTimeoutId = setTimeout(async () => {
            const data = await getProducts(value, 1)
            setProductName(value)
            setProducts(data.products)
            setTotalPages(data.totalPages)
        }, 1000);

        // Lưu id của timeout mới vào state
        setTimeoutId(newTimeoutId);

    }

    return (
        <div className="my-10">
            <div className="sm:w-2/5 w-full my-4">
                <Input placeholder="Search to here..." type="text" className=" focus-visible:ring-primary1 ml-4"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            {isLoading ? <Skeleton className="w-full h-60" /> :
                (products && products?.length != 0) ?
                    <div>
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2">
                            {
                                products.map(product => (
                                    <div key={product._id} className="p-4">
                                        <CardProduct product={product} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    : <div className='my-10 flex justify-center'>
                        <Image
                            src={'/empty.gif'}
                            alt='empty'
                            width={200}
                            height={200}
                            priority
                        />
                    </div>
            }
            <div className='my-4 px-4'>
                {totalPages != 1 &&
                    <Pagination className='justify-end'>
                        <PaginationContent>
                            {
                                currentPage != 1 &&
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    />
                                </PaginationItem>
                            }

                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(index + 1)}
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {currentPage < totalPages && (
                                <>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        />
                                    </PaginationItem>
                                </>
                            )}
                        </PaginationContent>
                    </Pagination>
                }
            </div>
        </div>
    )
}

export default ProductPage