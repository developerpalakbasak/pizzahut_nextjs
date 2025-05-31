"use client";
import { Loader } from "@/components/Loader";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RxAvatar } from "react-icons/rx";

const AccountPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    session ? <div className="flex flex-col gap-3 justify-center items-center h-[80vh]">
      {session.user.image ? <Image
        alt="avatar"
        height={150}
        width={150}
        src={session?.user.image}
        className="rounded-full"
      />:<RxAvatar size={150}/>}
      <h1 className="font-semibold text-lg">Account</h1>
      <p>{session?.user.name} </p>
      <p>{session?.user.email} </p>
      <button
        onClick={handleSignOut}
        className="px-3 py-2 bg-primary text-white rounded"
      >
        Sign Out
      </button>
    </div>:<div className="h-[80vh] flex justify-center items-center">
    <Loader/>
    </div>
  );
};

export default AccountPage;
