import { NextResponse } from "next/server";
import connectMongo from "@/lib/Mongoose";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { auth } from "@/auth";
import { blogSchema } from "@/schemas/blogSchema";

export async function GET() {
  try {

    await connectMongo();

    const blogs = await Blog.find()
      .populate("author")
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );

  }
}

export async function POST(request: Request) {
  try {

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validated = blogSchema.parse(body);

    await connectMongo();

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const newBlog = new Blog({
      title: validated.title,
      content: validated.content,
      tags: validated.tags || [],
      author: user._id,
    });

    await newBlog.save();

    return NextResponse.json(
      newBlog,
      { status: 201 }
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );

  }
}