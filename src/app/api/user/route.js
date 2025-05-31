import { ConnectDB } from "@/lib/config/db";
import UserModel from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


const loadDB = async () => {
    await ConnectDB();
}

loadDB();





// api endpoint to create user
export async function POST(request) {
    const { firstName, lastName, email, password, confirmPassword } = await request.json();

    // console.log(firstName)

    // Basic validation to ensure all required fields are provided
    if (!firstName || !lastName || !email || !password, !confirmPassword) {
        return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    if (password !== confirmPassword) {
        return NextResponse.json({ success: false, message: "Password and confirm password value must be same" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email })

    if (user) {
        return NextResponse.json({ success: false, message: "Account already exists. Please Login" }, { status: 400 });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

    const hashedPassword = await bcrypt.hash(password, saltRounds)


    const userData = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    };


    // console.log(orderItems)

    try {
        const user = await UserModel.create(userData)

        return NextResponse.json({ success: true, user }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ success: false, message: "Error creating user." }, { status: 500 });
    }

}


// api endpoint to get all user
export async function GET() {

    // console.log("get request")

    const users = await UserModel.find({})

    return NextResponse.json({ success: true, users }, { status: 200 });


}

