import { IBanner } from "@/interface/banner"
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "./ui/button";
import Image from "next/image";

const Banner: React.FC<{ banners: IBanner[] }> = ({ banners }) => {

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
            >
                {banners[0] &&
                    banners.map((banner) => (
                        <SwiperSlide key={banner._id} className="relative overflow-hidden">
                            {/* <img src={banner.image} className="w-full h-full scale-110" /> */}
                            <Image
                                src={banner.image}
                                alt={banner.name}
                                width={800}
                                height={600}
                                priority
                                className="w-full h-full scale-110"
                            />
                            <div
                                className={`banner absolute lg:top-1/3 md:top-1/4 top-5 ${banner.color == 'black' ? 'lg:left-[20%] left-[10%]' : 'lg:right-[20%] right-[10%]'}`}>
                                <h5 className={`capitalize ${banner.color == 'white' ? 'text-white' : 'text-black'} md:text-2xl font-medium tracking-wide`}>{banner.title}</h5>
                                <h3 className={`md:my-10 my-4 capitalize ${banner.color == 'white' ? 'text-white' : 'text-black'} md:text-4xl text-2xl font-bold tracking-wider`}>{banner.name}</h3>
                                <Button size='lg' className={`md:block hidden hover:bg-primary1 ${banner.color == 'black' ? 'text-white bg-black' : 'text-black bg-white'}`}>
                                    Shop now
                                </Button>
                                <Button size='sm' className={`block md:hidden hover:bg-primary1 ${banner.color == 'black' ? 'text-white bg-black' : 'text-black bg-white'}`}>
                                    Shop now
                                </Button>
                            </div>

                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}

export default Banner

