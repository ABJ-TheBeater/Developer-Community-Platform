import { NextResponse } from "next/server";
import connectMongo from "@/lib/Mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    await connectMongo();

    const users = await User.find().sort({ createdAt: -1 });

    return NextResponse.json(users, {
      status: 200,
    });
  } catch (error) {
    console.error("GET USERS ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectMongo();

    const newUser = new User({
      name: body.name,
      email: body.email,
      username: body.username,
      headline: body.headline,
      bio: body.bio,
      skills: body.skills,
    });

    await newUser.save();

    return NextResponse.json(newUser, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE USER ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}