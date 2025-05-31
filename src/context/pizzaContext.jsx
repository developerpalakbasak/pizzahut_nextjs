"use client";
import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzaInfo, setPizzaInfo] = useState([]); 
    const [pizzaOrders, setPizzaOrders] = useState([]); 
    const [loading, setLoading] = useState(true);



    const fetchOrders = async () => {
        try {
            const res = await axios.get("/api/order");

            setPizzaOrders(res.data); // Access response data directly

        
            
        } catch (error) {
            console.error(error.message);
        }
    };

    // fetch all pizza
    const fetchPizzaData = async () => {
        try {
            const res = await axios.get("/api/pizza");

            setPizzaInfo(res.data); // Access response data directly
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        fetchOrders()
        fetchPizzaData();
        
    }, []);

    return (
        <PizzaContext.Provider value={{ pizzaInfo, loading, fetchPizzaData, fetchOrders, pizzaOrders }}>
            {children}
        </PizzaContext.Provider>
    );
};

export const usePizza = () => useContext(PizzaContext);