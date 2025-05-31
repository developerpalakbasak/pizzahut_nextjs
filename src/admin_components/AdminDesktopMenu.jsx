"use client";
import React from "react";
import Link from "next/link";
import { MdAddBox } from "react-icons/md";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const AdminDesktopMenu = () => {
  const path = usePathname();

  const { data: session } = useSession();

  // console.log(path)

  return (
    <>
      <div>
        <ul className="flex items-center gap-5">
          {/* Dashboard Link */}
          <li>
            <Link href="/admin/account">
              {/* <div className="relative rounded-[0.50rem] px-3 py-2 bg-primary flex items-center"> */}
                {/* Cart Icon Button */}
                <span
                  className={`flex items-center justify-center size-10 p-2 rounded-md ${
                    path == "/admin/account"
                      ? "text-white bg-primary"
                      : " bg-white "
                  } `}
                >
                  {session?.user.image ? (
                  <Image
                    alt="avatar"
                    className="rounded-full"
                    height={25}
                    width={25}
                    src={session?.user.image}
                  />
                ) : (
                  <FaUser color="white" size={20} />
                )}
                </span>
                
              {/* </div> */}
            </Link>
          </li>
          <li>
            <Link
              href="/admin"
              className="w-full h-full flex items-center justify-center"
            >
              <span
                className={`flex items-center justify-center size-10 p-2 rounded-md ${
                  path == "/admin" ? "text-white bg-primary" : " bg-white "
                } `}
              >
                <MdSpaceDashboard size={28} className="" />
              </span>
            </Link>
          </li>

          {/* Add Products Link */}
          <li>
            <Link
              href="/admin/addproducts"
              className="w-full h-full flex items-center justify-center"
            >
              <span
                className={`flex items-center justify-center size-10 p-2 rounded-md ${
                  path == "/admin/addproducts"
                    ? "text-white bg-primary"
                    : " bg-white "
                } `}
              >
                <MdAddBox size={28} className="" />
              </span>
            </Link>
          </li>

          {/* Edit Products Link */}
          <li>
            <Link
              href="/admin/editproducts"
              className="w-full h-full flex items-center justify-center"
            >
              <span
                className={`flex items-center justify-center size-10 p-2 rounded-md ${
                  path == "/admin/editproducts"
                    ? "text-white bg-primary"
                    : " bg-white "
                } `}
              >
                <FaRegEdit size={28} className="" />
              </span>
            </Link>
          </li>

          {/* Orders Link */}
          <li>
            <Link
              href="/admin/orders"
              className="w-full h-full flex items-center justify-center"
            >
              <span
                className={`flex items-center justify-center size-10 p-2 rounded-md ${
                  path == "/admin/orders"
                    ? "text-white bg-primary"
                    : " bg-white "
                } `}
              >
                <LuNotepadText size={28} className="" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminDesktopMenu;
