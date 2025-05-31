"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Footer = () => {


    const path = usePathname();
    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Shop", path: "/shop" },
    ];



    return (
        <div className='py-12 relative w-[80vw] max-w-5xl mx-auto'>
            <div className=" flex justify-around gap-4">


                    <Link className='text-xl font-bold logo' href="/"><span className='text-primary'>Pizza</span>Hat</Link>

                    {/* bottom Menu  */}
                    <div>
                        <p className='text-primary text-xl'>Menu</p>
                        <div className="">
                            <ul className="flex flex-col justify-center gap-4 py-2 text-sm rounded-2xl">
                                {links.map(link => (
                                    <li
                                        key={link.path}
                                        className={path === link.path ? "color-primary" : ""}
                                    >
                                        <Link href={link.path}>{link.name} </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
            

                <div className='text-sm flex flex-col gap-2'>
                <p className=' text-xl text-primary'>Others</p>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Refund Policy</p>
                    <p>Shipping Policy</p>
                </div>



            </div>
        </div>
    )
}

export default Footer