"use client";
import AdminEditProductsItem from "@/admin_components/AdminEditProductsItem";
import { Loader } from "@/components/Loader";
import { usePizza } from "@/context/pizzaContext";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const EditProducts = () => {

  const { pizzaInfo, loading, fetchPizzaData } = usePizza();

  const { allPizza } = pizzaInfo;

  const deletePizza = async (mongoId) => {
    const response = await axios.delete("/api/pizza", {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    // console.log(mongoId);
    fetchPizzaData();
  };
  useEffect(() => {
    fetchPizzaData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader/>
        </div>
      ) : (
        <>
          <div className="px-4 py-8 sm:px-8">
            <h1 className="font-bold text-xl max-w-4xl mx-auto">
              Edit products
            </h1>
            <div className="flex flex-col gap-5 w-full pt-6 relative z-10">
              {allPizza.length > 0 ? allPizza.map((item) => (
                <AdminEditProductsItem
                  key={item._id}
                  item={item}
                  deletePizza={deletePizza}
                />
              )):<>
              <h1>No Products to Edit</h1>
              </>}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProducts;
