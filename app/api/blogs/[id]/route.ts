import { NextResponse } from "next/server";
import connectMongo from "@/lib/Mongoose";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { auth } from "@/auth";
import { blogSchema } from "@/schemas/blogSchema";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Params
) {
  try {

    const { id } = await params;

    await connectMongo();

    const blog = await Blog.findById(id)
      .populate("author");

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      blog,
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );

  }
}

export async function PATCH(
  request: Request,
  { params }: Params
) {
  try {

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await request.json();

    const validated = blogSchema.parse(body);

    await connectMongo();

    const user = await User.findOne({
      email: session.user.email,
    });

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    if (blog.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    blog.title = validated.title;
    blog.content = validated.content;
    blog.tags = validated.tags || [];

    await blog.save();

    return NextResponse.json(
      blog,
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );

  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await connectMongo();

    const user = await User.findOne({
      email: session.user.email,
    });

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    if (blog.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog deleted" },
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );

  }
}