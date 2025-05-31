import { ConnectDB } from "@/lib/config/db";
import PizzaModel from "@/lib/models/pizzaModel";
import { writeFile } from "fs/promises";
import uploadOnCloudinary from "@/lib/config/uploadOnCloudinary";
import cloudinary from "@/lib/config/cloudinaryConfig";
const { NextResponse } = require("next/server");

// Connect to the database once
const loadDB = async () => {
  await ConnectDB();
};
loadDB();

// GET all pizzas
export async function GET() {
  const allPizza = await PizzaModel.find({});
  const pizzaCount = allPizza.length;
  return NextResponse.json({ success: true, pizzaCount, allPizza });
}

// POST a new pizza
export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { success: false, msg: "Image is required" },
        { status: 400 }
      );
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const tempFilePath = `/tmp/${Date.now()}_${image.name}`;

    await writeFile(tempFilePath, buffer); // ✅ use /tmp for Vercel

    const cloudinaryResponse = await uploadOnCloudinary(tempFilePath);

    const pizzaData = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
      image: cloudinaryResponse.secure_url,
      image_id: cloudinaryResponse.public_id,
    };

    await PizzaModel.create(pizzaData);

    return NextResponse.json({ success: true, msg: "Pizza added" });
  } catch (error) {
    console.error("Error saving pizza:", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT to update isTopSelling or isFeature
export async function PUT(request) {
  try {
    const { id, isTopSelling, isFeature } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Pizza ID is required" },
        { status: 400 }
      );
    }

    const updatedPizza = await PizzaModel.findByIdAndUpdate(
      id,
      {
        ...(isTopSelling !== undefined && { isTopSelling }),
        ...(isFeature !== undefined && { isFeature }),
      },
      { new: true }
    );

    if (!updatedPizza) {
      return NextResponse.json(
        { success: false, message: "Pizza not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pizza updated successfully",
      updatedPizza,
    });
  } catch (error) {
    console.error("Error updating pizza:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update pizza",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE a pizza
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const pizza = await PizzaModel.findById(id);

    if (!pizza) {
      return NextResponse.json({ msg: "Item not found" }, { status: 404 });
    }

    const cloudinaryResponse = await cloudinary.uploader.destroy(
      pizza.image_id
    );

    if (cloudinaryResponse.result === "ok") {
      await PizzaModel.findByIdAndDelete(id);
      return NextResponse.json({ msg: "Pizza deleted" }, { status: 200 });
    }

    return NextResponse.json({ msg: "Failed to delete image" }, { status: 500 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
