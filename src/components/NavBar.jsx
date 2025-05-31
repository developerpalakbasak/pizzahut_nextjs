"use client";

import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";

import { useCart } from "@/context/cartContext";
import MobileMenu from "./MobileMenu";
import DesktopMenuItem from "./DesktopMenuItem";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  // console.log(session)
  const { cart, loading } = useCart();

  return (
    <nav className="relative w-[90vw] md:w-[80vw] max-w-5xl mx-auto select-none">
      <div className="rounded-xl absolute flex items-center justify-between bg-secondary w-full mt-2 px-4 py-2 min-h-[2.5rem] sm:min-h-[3rem]">
        {/* Mobile menu */}
        <MobileMenu/>

        {/* Logo Title */}
        <div className="text-xl font-bold logo flex items-center">
          <Link href="/">
            <span className="text-primary">Pizza</span>Hut
          </Link>
        </div>

        {/* Desktop menu */}
        <div className=" hidden sm:block">
          <DesktopMenuItem />
        </div>

        <div className="flex gap-2 justify-center items-center">
          {session ? (
            session?.user ? (
              session.user.role === "admin" ? (
                <Link href="/admin">
                  <div className="relative rounded-[0.50rem] px-2 py-1 bg-primary flex items-center">
                    <button className="relative transition duration-300 px-1 py-1">
                      <GrUserAdmin color="white" size={20} />
                    </button>
                  </div>
                </Link>
              ) : (
                <Link href="/account">
                  <span className="relative rounded-[0.50rem] px-3 py-2 bg-primary flex items-center">
                    {session?.user?.image ? (
                      <Image
                        alt="avatar"
                        className="rounded-full"
                        height={25}
                        width={25}
                        src={session.user.image}
                      />
                    ) : (
                      <FaUser color="white" size={20} />
                    )}
                  </span>
                </Link>
              )
            ) : null
          ) : (
              <Link
                href="/signin"
                className="text-black font-semibold underline px-2"
              >
                Sign-in
              </Link>
            )}

          <Link href="/cart">
            <span className="relative rounded-[0.50rem] px-3 py-2 bg-primary flex items-center">
              {/* Cart Icon Button */}
              <button className="relative transition duration-300">
                <FaShoppingCart color="white" size={25} />
              </button>

              {/* Amount Badge */}
             
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
             
               { loading ? "" : cart.length}
              </span>

            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
