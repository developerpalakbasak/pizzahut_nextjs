"use server";

import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/userModel";
import bcrypt from "bcryptjs";

export async function signUp(formData) {
  //   const email = formData.get('email')
  //   const password = formData.get('password')
  const { name, email, password, reTypedPassword } = formData;

  const ispasswordValid = password == reTypedPassword;

  if (!ispasswordValid) {
    return { success: false, message: "Passwords must be same" };
  }

  await ConnectDB()
  const isUserAvailableInDb = await UserModel.findOne({email})
console.log(isUserAvailableInDb)

if (isUserAvailableInDb){
    return { success: false, message: "duplicate user" };
}


  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );

  try {
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      provider: "credentials",
    });

    if (newUser._id) {
      return { success: true, message: "User created" };
    }
  } catch (err) {
    console.log(err)
    return { success: false, message: "Something went wrong" };
  }
}
