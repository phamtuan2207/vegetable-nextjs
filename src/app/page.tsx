'use client'

import Banner from "@/components/banner";
import { IBanner } from "@/interface/banner";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Header from "./(user)/header/header";
import Footer from "./(user)/footer/footer";
import { getBanner, getBestSeller } from "./api";
import { IProduct } from "@/interface/product";
import CardProduct from "@/components/card-product";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {

  const [banners, setBanner] = useState<IBanner[] | null>(null)
  const [bestSeller, setBestSeller] = useState<IProduct[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async () => {
    // const [bannerData, sellerData] = await Promise.all([
    //   getBanner(),
    //   getBestSeller()
    // ]);
    const bannerData = await getBanner()
    setBanner(bannerData.banners)
    const sellerData = await getBestSeller()
    setBestSeller(sellerData.products)
  }

  useEffect(() => {
    fetchData()
    setIsLoading(false)
  }, [])

  return (
    <>
      <Header />
      <div className="pt-20">
        <div>
          {
            isLoading ? <Skeleton className="w-full h-[200px]" /> :
              banners &&
              <Banner banners={banners} />
          }
        </div>
        <div className="my-10">
          <h2 className="text-center tracking-wider uppercase font-semibold text-xl mb-4">best seller</h2>
          {isLoading ? <Skeleton className="w-full h-[200px]" /> : bestSeller &&
            <div>
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2">
                {
                  bestSeller.map(seller => (
                    <div key={seller._id} className="p-4">
                      <CardProduct product={seller} />
                    </div>
                  ))
                }
              </div>
              <Link href='/product' className="block text-center my-4">
                <Button className="bg-primary1 text-white capitalize hover:bg-primary1/90">see all products</Button>
              </Link>
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}
