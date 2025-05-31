import { ConnectDB } from "@/lib/config/db";
import PizzaModel from "@/lib/models/pizzaModel";
import { mkdir, writeFile } from "fs/promises";
import uploadOnCloudinary from "@/lib/config/uploadOnCloudinary";
import cloudinary from "@/lib/config/cloudinaryConfig";
const { NextResponse } = require("next/server");

const loadDB = async () => {
  await ConnectDB();
};

loadDB();

// api endpoint to get all pizzas
export async function GET() {
  const allPizza = await PizzaModel.find({});
  const pizzaCount = allPizza.length;
  return NextResponse.json({ success: true, pizzaCount, allPizza });
}

// api endpoint to add pizza
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
    const tempFilePath = `./public/temp/${Date.now()}_${image.name}`;
    // Ensure temp directory exists
    await mkdir("./public/temp", { recursive: true });

    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(tempFilePath);

    // console.log(cloudinaryResponse);
    const image_id = cloudinaryResponse.public_id;
    const pizzaData = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
      image: cloudinaryResponse.secure_url,
      image_id,
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

// api endpoint to update isTopSelling and isFeature
export async function PUT(request) {
  try {
    const { id, isTopSelling, isFeature } = await request.json();

    // Validate the provided ID and fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Pizza ID is required" },
        { status: 400 }
      );
    }

    // Update the pizza document
    const updatedPizza = await PizzaModel.findByIdAndUpdate(
      id,
      {
        ...(isTopSelling !== undefined && { isTopSelling }),
        ...(isFeature !== undefined && { isFeature }),
      },
      { new: true } // Return the updated document
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

// api endpoint to delete pizza
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");

  const pizza = await PizzaModel.findById(id);
  console.log(pizza)

  if (!pizza) {
    return NextResponse.json({ msg: "item not found" }, { status: 404 });
  }

  try {
    // delete image from cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(
      pizza.image_id
    );

    if (cloudinaryResponse.result === "ok") {
      // delete from database
      await PizzaModel.findByIdAndDelete(id);
      return NextResponse.json({ msg: "Pizza deleted" }, { status: 200 });
    }

    return NextResponse.json({ msg: "Falied to delete" }, { status: 500 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
