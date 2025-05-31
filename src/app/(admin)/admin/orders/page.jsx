"use client"
import React, { useState } from 'react';
import { usePizza } from '@/context/pizzaContext';

const OrdersPage = () => {
  const { fetchOrders, pizzaOrders } = usePizza();
  const { allOrders } = pizzaOrders;
  const [category, setCategory] = useState("Pending");

  console.log(allOrders)
  
  // count all product amount 
  const initialValue = 0;

  const pendingAmount = allOrders
  ? allOrders
      .filter((item) => item.paymentStatus === "Pending")
      .reduce((acc, curr) => acc + curr.totalAmount, initialValue)
  : 0;

  const completedAmount = allOrders
  ? allOrders
      .filter((item) => item.paymentStatus === "Complete")
      .reduce((acc, curr) => acc + curr.totalAmount, initialValue)
  : 0;

  // console.log(completedAmount)


  return (
    <>
      {allOrders ? (
        <div className="flex flex-col gap-3">
          {/* Order page top */}
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Running Orders {allOrders.length}</p>
            <span className='flex justify-center gap-3 items-center'>
              <p className='font-semibold'>Payment Status: </p>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                className="w-40 px-4 py-2 border text-gray-500"
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </select>
            </span>
          </div>

          {/* Orders list */}
          <div className="flex flex-col gap-3">
            {allOrders
              .filter((item) => item.paymentStatus == category)
              .map((item, index) => (
                <div key={index}>
                  <span className="flex gap-3 rounded justify-between bg-white px-3 py-2">
                    <p>{item._id}</p>
                    <p>{item.address}</p>
                    <p>{item.totalAmount}</p>
                    <p>{item.paymentStatus}</p>
                  </span>
                </div>
              ))}

              <span className='flex justify-around bg-white px-3 py-3'><p className='font-semibold text-2xl'>Pending Total Amount: </p> <p className='font-semibold text-2xl'>{pendingAmount} </p></span>
          </div>



        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default OrdersPage;
