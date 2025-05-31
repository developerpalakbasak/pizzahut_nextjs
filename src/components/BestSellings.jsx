"use client";
import React, { useState } from "react";
import ContentItem from "./ContentItem";
import { usePizza } from "@/context/pizzaContext";
import { useCart } from "@/context/cartContext";
import { Loader } from "./Loader";

const BestSellings = () => {
  const { pizzaInfo, loading } = usePizza();
  const { addToCart } = useCart();

  // Safely access allPizza with optional chaining and provide a default empty array
  const allPizza = pizzaInfo?.allPizza || [];

  const [showTopRated, setShowTopRated] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white rounded font-semibold w-36 flex gap-3 px-3 py-2 justify-center mx-0">
          <button
            className={!showTopRated ? "text-primary" : ""}
            onClick={() => setShowTopRated(false)}
          >
            All
          </button>
          <button
            className={showTopRated ? "text-primary" : ""}
            onClick={() => setShowTopRated(true)}
          >
            Top Sellings
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <Loader/>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <></>
        ) : allPizza.filter(pizza => showTopRated ? pizza.isTopSelling : true).length === 0 ? (
          <div className="col-span-full text-center py-8">
            {showTopRated ? "No top-rated pizzas available" : "No pizzas available"}
          </div>
        ) : (
          allPizza
            .filter(pizza => showTopRated ? pizza.isTopSelling : true)
            .map((pizza, index) => (
              <ContentItem
                key={pizza._id}
                id={pizza._id}
                name={pizza.title}
                description={pizza.description}
                price={pizza.price}
                category={pizza.category}
                image={pizza.image}
                addToCart={addToCart}
              />
            ))
        )}
      </div>
    </>
  );
};

export default BestSellings;