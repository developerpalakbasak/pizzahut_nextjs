"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader";

const page = () => {
  const upload_area = "https://res.cloudinary.com/ddfimjibr/image/upload/v1748628694/upload_area_fqia4w.png"
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    category: "rounded",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await axios.post("/api/pizza", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          price: "",
          description: "",
          category: "rounded",
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 sm:px-8">
      <h1 className="font-bold text-xl max-w-4xl mx-auto">Add products</h1>

      <form onSubmit={onSubmitHandler} className="pt-6 max-w-4xl mx-auto">
        <p className="text-xl">Upload image</p>
        <label htmlFor="image" className="inline-block mt-2">
          <Image
            src={!image ? upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="inputImg"
            className="rounded border"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>

        <p className="text-xl mt-6">Pizza title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full mt-2 px-4 py-3 border rounded"
          type="text"
          placeholder="Title here"
          required
        />

        <p className="text-xl mt-6">Pizza Price</p>
        <input
          name="price"
          onChange={onChangeHandler}
          value={data.price}
          className="w-full mt-2 px-4 py-3 border rounded"
          type="number"
          placeholder="Price here"
          required
        />

        <p className="text-xl mt-6">Pizza description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full mt-2 px-4 py-3 border rounded"
          placeholder="Write content here"
          rows={6}
          required
        />

        <p className="text-xl mt-6">Pizza Category</p>
        <div className="flex gap-6 items-center mt-3">
          <select
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-full sm:w-48 px-4 py-3 border text-gray-500 rounded"
          >
            <option value="rounded">Rounded</option>
            <option value="squire">Squire</option>
          </select>

          {loading ? (
            <span>
              <Loader />
            </span>
          ) : (
            <button
              type="submit"
              className="w-full sm:w-48 h-12 bg-primary text-white rounded"
            >
              Add Pizza
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default page;
