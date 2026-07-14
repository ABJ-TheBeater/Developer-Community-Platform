import Link from "next/link";
import connectMongo from "@/lib/Mongoose";
import Blog from "@/models/Blog";

export default async function BlogsPage() {

    await connectMongo();

    const blogs = await Blog.find()
        .populate("author")
        .sort({ createdAt: -1 });

    return (
        <main className="max-w-5xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Blogs
                </h1>

                <Link
                    href="/blogs/new"
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Create Blog
                </Link>

            </div>

            <div className="space-y-6">

                {blogs.map((blog: any) => (

                    <div
                        key={blog._id}
                        className="border rounded-lg p-5"
                    >

                        <Link
                            href={`/blogs/${blog._id}`}
                            className="text-xl font-bold hover:underline"
                        >
                            {blog.title}
                        </Link>

                        <p className="text-gray-600 mt-2">
                            {blog.content.substring(0, 150)}...
                        </p>

                        <p className="text-sm mt-4">
                            By {blog.author?.name}
                        </p>

                    </div>

                ))}

            </div>

        </main>
    );
}