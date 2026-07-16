import type { Metadata } from "next";
import connectMongo from "@/lib/Mongoose";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { auth } from "@/auth";
import EditDeleteButtons from "@/components/EditDeleteButtons";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogResponse } from "@/types";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {

    const { id } = await params;

    await connectMongo();

    const blog = await Blog.findById(id);

    if (!blog) {

        return {
            title: "Blog Not Found",
        };

    }

    return {

        title: `${blog.title} | DevCommunity`,

        description: blog.content.substring(0, 150),

    };

}

export default async function BlogPage({
    params,
}: Props) {

    const { id } = await params;

    await connectMongo();

    const session = await auth();

    const blog = await Blog.findById(id)
        .populate("author");

    if (!blog) {

        notFound();

    }

    const relatedBlogs = await Blog.find({
        _id: { $ne: blog._id },
        tags: { $in: blog.tags },
    })
        .populate("author")
        .limit(3);

    const readingTime = Math.max(
        1,
        Math.ceil(blog.content.split(/\s+/).length / 200)
    );

    let canEdit = false;

    if (session?.user?.email) {

        const currentUser = await User.findOne({
            email: session.user.email,
        });

        if (
            currentUser &&
            blog.author._id.toString() ===
                currentUser._id.toString()
        ) {

            canEdit = true;

        }

    }

    return (

        <main className="max-w-4xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold">
                {blog.title}
            </h1>

            <p className="text-gray-500 mt-2">

                By{" "}

                <Link
                    href={`/profile/${blog.author?.username}`}
                    className="text-blue-500 hover:underline"
                >
                    {blog.author?.name}
                </Link>

            </p>

            <p className="text-sm text-gray-500 mt-1">
                {new Date(blog.createdAt).toLocaleDateString()} • {readingTime} min read
            </p>

            <div className="mt-8 whitespace-pre-wrap">
                {blog.content}
            </div>

            <div className="flex flex-wrap gap-2 mt-8">

                {blog.tags.map((tag: string) => (

                    <span
                        key={tag}
                        className="inline-block bg-blue-700 border border-white/20 text-white px-3 py-1 rounded-full text-sm"
                    >
                        {tag}
                    </span>

                ))}

            </div>

            {canEdit && (

                <EditDeleteButtons
                    id={blog._id.toString()}
                />

            )}

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                    Related Posts
                </h2>

                {relatedBlogs.length === 0 ? (

                    <p>No related posts found.</p>

                ) : (

                    <div className="space-y-4">

                        {relatedBlogs.map((related: BlogResponse) => (

                            <Link
                                key={related._id}
                                href={`/blogs/${related._id}`}
                                className="block border rounded-xl p-4 hover:bg-white/10 transition"
                            >

                                <h3 className="font-bold">
                                    {related.title}
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    {related.content.substring(0, 120)}...
                                </p>

                            </Link>

                        ))}

                    </div>

                )}

            </div>

        </main>

    );

}