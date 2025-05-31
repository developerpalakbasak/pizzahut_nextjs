// app/cart/page.jsx

"use client";
import { useCart } from '@/context/cartContext';
import React, { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
import { Loader } from '@/components/Loader';

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeItemFromCart,
    selected,
    setSelected,
    selectedFromCart,
    selectedPizzaTotalPrice,
    setSelectedPizzaTotalPrice,
    loading
  } = useCart();

  // console.log(loading)
  // ✅ Calculate total price based on selectedFromCart
  useEffect(() => {
    const totalSelectedAmount = selectedFromCart.reduce(
      (acc, item) => acc + (item.price || 0) * item.quantity,
      0
    );
    setSelectedPizzaTotalPrice(totalSelectedAmount);
  }, [cart, selected, selectedFromCart]);

  // console.log(cart)

  const handleCart = (id, name, price, action) => {
    if (action === "decrement") removeFromCart(id);
    if (action === "increment") addToCart({ id, name });
    if (action === "itemRemove") removeItemFromCart(id);
  };

  return loading ?(
    <div className='h-[80vh] flex justify-center items-center'>
    <Loader/>
    </div>
  ): (
    <div className='flex flex-col gap-3 w-[90vw] md:w-[80vw] max-w-5xl mx-auto mt-20'>
      {cart.length > 0 ? (
        <div className='rounded flex flex-col gap-3'>
          {cart.map((item) => (
            <div key={item.id} className='bg-white px-3 py-2 rounded border-2 border-emerald-400'>
              <div className='flex flex-col gap-3'>
                <div className='flex justify-between items-center'>
                  <span className='flex gap-3 items-center'>
                    <div className='flex'>
                      <input
                        type="checkbox"
                        id={`checkbox-${item.id}`}
                        className="peer hidden"
                        value={item.id}
                        checked={selected.includes(item.id)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setSelected((prevSelected) =>
                            isChecked
                              ? [...prevSelected, item.id]
                              : prevSelected.filter((id) => id !== item.id)
                          );
                        }}
                      />
                      <label
                        htmlFor={`checkbox-${item.id}`}
                        className="h-[18px] w-[18px] inline-block border-2 border-primary rounded cursor-pointer 
                          peer-checked:bg-primary peer-checked:border-primary"
                      ></label>
                    </div>
                    <p className='text-xl font-semibold'>{item.name}</p>
                  </span>

                  <span className='hidden sm:flex gap-3'>
                    <span className='flex gap-3'> <p>{item.quantity}</p> <p>x</p> <p>{item.price}</p> </span>
                    <span>=</span>
                    <span>{item.quantity * item.price}</span>
                  </span>

{/* increment decrement button */}
                  <span className='flex gap-5 items-center select-none'>
                    {item.quantity > 1 ? (
                      <span onClick={() => handleCart(item.id, item.name, item.price, "decrement")} className='bg-secondary cursor-pointer px-4 py-1 rounded'>-</span>
                    ) : (
                      <span onClick={() => handleCart(item.id, item.name, item.price, "itemRemove")} className='bg-red-600 text-white cursor-pointer px-2 py-1 rounded'><MdDelete size={22} /></span>
                    )}
                    {item.quantity}
                    <span onClick={() => handleCart(item.id, item.name, item.price, "increment")} className='bg-secondary cursor-pointer px-4 py-1 rounded'>+</span>
                  </span>
                </div>

                <span className='sm:hidden flex gap-3'>
                  <span className='flex gap-3'> <p>{item.quantity}</p> <p>x</p> <p>{item.price}</p> </span>
                  <span>=</span>
                  <span>{item.quantity * item.price}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className='font-semibold'>
            No items in cart ...... <Link href="/shop" className='text-white bg-primary hover:bg-secondary hover:text-primary rounded px-3 py-1'>Shop Now</Link>
          </p>
        </div>
      )}

      <div className='bg-white h-1 rounded '></div>

      <div className='flex justify-between items-center px-3 py-2 bg-white'>
        <p className='text-xl font-bold'>Total :</p>
        <p className='text-xl'>BDT {selectedPizzaTotalPrice}</p>
        {selected.length > 0 ? (
          <Link href="/cart/checkout">
            <button className='bg-primary hover:bg-secondary hover:text-primary rounded text-white text-xl px-3 py-2'>
              Checkout
            </button>
          </Link>
        ) : (
          <button
            className='bg-gray-400 rounded text-white text-xl px-3 py-2 cursor-not-allowed'
            disabled
          >
            Checkout
          </button>
        )}
      </div>
    </div>

   
  )
};

export default Cart;
