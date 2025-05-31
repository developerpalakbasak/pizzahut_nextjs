"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/Loader";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setUsers(res.data.users);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("/api/order");
      setOrders(res.data.allOrders);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchAllUser();
  }, []);

  // Prepare data for the pie chart
  const pendingOrdersCount = orders.filter(
    (item) => item.paymentStatus === "Pending"
  ).length;
  const completeOrdersCount = orders.filter(
    (item) => item.paymentStatus === "Complete"
  ).length;

  const pieData = [
    {
      name: `Payment Pending Orders ${pendingOrdersCount}`,
      value: pendingOrdersCount,
    },
    {
      name: `Payment Completed Orders ${completeOrdersCount}`,
      value: completeOrdersCount,
    },
  ];

  const COLORS = ["#FF8042", "#16a34a"]; // Define colors for the pie chart

  return (
    <div className="w-[90vw] md:w-[80vw] max-w-6xl pb-5 mx-auto flex flex-col gap-16 mt-20 h-[100vh]">
      <p className="text-2xl font-semibold">This is admin dashboard</p>
      {!loading ? (
        <div>
          <p className="text-xl">
            You have{" "}
            <span className="text-2xl font-semibold">{users.length}</span> users
          </p>
          <p className="text-xl">
            You have{" "}
            <span className="text-2xl font-semibold">{orders.length}</span>{" "}
            orders
          </p>

          {/* Pie Chart */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Order Status Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Admin;
