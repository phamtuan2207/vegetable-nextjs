import Image from 'next/image'
import React from 'react'
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";

const Footer = () => {
    const footerItem = "py-10 px-4 border-[1px] border-[#ededed] capitalize"
    const footerSpanItem = "cursor-pointer hover:text-primary1 w-max "
    return (
        <div className="bg-primary2">
            <div className="grid lg:grid-cols-4 md:grid-cols-2">
                <div className={`${footerItem}`}>
                    <Image
                        src="/logo.webp"
                        alt="logo"
                        height={40}
                        width={160}
                        priority
                        className="h-10 w-40"
                    />
                    <div className="flex gap-8 text-3xl mt-4">
                        <CiTwitter className="hover:text-primary1 cursor-pointer" />
                        <CiYoutube className="hover:text-primary1 cursor-pointer" />
                        <CiFacebook className="hover:text-primary1 cursor-pointer" />
                        <CiInstagram className="hover:text-primary1 cursor-pointer" />
                    </div>
                </div>
                <div className={`${footerItem}`}>
                    <h3 className="font-semibold text-lg">customer care</h3>
                    <div className="mt-4 flex flex-col gap-1 text-[#111111]">
                        <span className={`${footerSpanItem}`}>about us</span>
                        <span className={`${footerSpanItem}`}>privacy policy</span>
                        <span className={`${footerSpanItem}`}>terms & conditions</span>
                        <span className={`${footerSpanItem}`}>products return</span>
                        <span className={`${footerSpanItem}`}>wholesale policy</span>
                    </div>
                </div>
                <div className={`${footerItem}`}>
                    <h3 className="font-semibold text-lg">quick shops</h3>
                    <div className="mt-4 flex flex-col gap-1 text-[#111111]">
                        <span className={`${footerSpanItem}`}>pagination </span>
                        <span className={`${footerSpanItem}`}>terms & conditions</span>
                        <span className={`${footerSpanItem}`}>contact</span>
                        <span className={`${footerSpanItem}`}>accessories</span>
                        <span className={`${footerSpanItem}`}>home page</span>
                    </div>
                </div>
                <div className={`${footerItem}`}>
                    <h3 className="font-semibold text-lg">company</h3>
                    <div className="mt-4 flex flex-col gap-1 text-[#111111]">
                        <span className={`${footerSpanItem}`}>menu items </span>
                        <span className={`${footerSpanItem}`}>help center</span>
                        <span className={`${footerSpanItem}`}>address store</span>
                        <span className={`${footerSpanItem}`}>privacy policy</span>
                        <span className={`${footerSpanItem}`}>home page</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer