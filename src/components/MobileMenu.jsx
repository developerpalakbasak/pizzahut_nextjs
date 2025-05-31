"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";


const MobileMenu = () => {

    const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
    const mobileMenuRef = useRef(null);
    const path = usePathname();




    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setMobileMenuToggle(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [mobileMenuToggle]);




    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Shop", path: "/shop" },
    ];

    // console.log(path)


    return (

        <div ref={mobileMenuRef} className="relative rounded-[0.50rem] cursor-pointer px-2 py-1 bg-primary sm:hidden flex items-center" onClick={() => setMobileMenuToggle(!mobileMenuToggle)}>
            <span className="w-[25px]" >
                <RxHamburgerMenu color="white" className="w-full h-full" />
            </span>

            {mobileMenuToggle && (
                <div className="absolute bg-white -left-4 top-10 rounded w-24 shadow-lg">
                    <ul className="flex flex-col font-semibold w-full gap-6 px-3 py-3 text-sm rounded-2xl">
                        {links.map((link) => (<li key={link.name} className={path === link.path ? "text-primary" : ""} >
                            <Link onClick={() => setMobileMenuToggle(false)} href={link.path}>
                                {link.name}
                            </Link>
                        </li>))}
                    </ul>
                    

                </div>
            )}
        </div>

    )
}

export default MobileMenu