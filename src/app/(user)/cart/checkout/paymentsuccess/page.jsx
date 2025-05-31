"use client";

import { Loader } from "@/components/Loader";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

const Page = () => {
  const { selectedFromCart, cart, loading } = useCart();

  return !loading ? (
    selectedFromCart.length > 0 ? (
      <div className="mt-24 flex gap-3 w-[90vw] md:w-[80vw] max-w-5xl mx-auto">
        <h1>Order Placed successfully</h1>
        <Link
          className="px-3 py-1 rounded bg-primary hover:bg-secondary text-white hover:text-primary"
          href="/"
        >
          Continue Shopping
        </Link>
      </div>
    ) : cart.length > 0 ? (
      <div className="flex flex-col gap-2 justify-center items-center h-[80vh]">
        <h1 className="font-semibold text-lg">Select to checkout</h1>
        <Link
          href="/cart"
          className="px-3 py-2 text-white hover:text-primary bg-primary hover:bg-secondary rounded-lg"
        >
          Go to cart
        </Link>
      </div>
    ) : (
      <div className="flex flex-col gap-2 justify-center items-center h-[80vh]">
        <h1 className="font-semibold text-lg">Cart is Empty</h1>
        <Link
          href="/shop"
          className="px-3 py-2 text-white hover:text-primary bg-primary hover:bg-secondary rounded-lg"
        >
          Back to Shop
        </Link>
      </div>
    )
  ) : (
    <div className="flex justify-center items-center h-[80vh]">
      <Loader />
    </div>
  );
};

export default Page;
