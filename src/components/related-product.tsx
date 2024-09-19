import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image";
import { IProduct } from "@/interface/product";

const Banner: React.FC<{ products: IProduct[] }> = ({ products }) => {

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                // navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {products[0] &&
                    products.map((product) => (
                        <SwiperSlide key={product._id} className="relative overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={200}
                                height={300}
                                priority
                                className="w-full h-full"
                            />

                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}

export default Banner

