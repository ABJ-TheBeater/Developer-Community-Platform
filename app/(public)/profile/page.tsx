import { auth } from "@/auth";
import connectMongo from "@/lib/Mongoose";
import User from "@/models/User";
import Blog from "@/models/Blog";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user?.email) {

        redirect("/api/auth/signin");

    }

    await connectMongo();

    const user = await User.findOne({
        email: session.user.email,
    });

    const blogs = await Blog.find({
        author: user._id,
    }).sort({
        createdAt: -1,
    });

    return (

        <main className="max-w-5xl mx-auto px-6 py-10">

            <div className="flex items-center gap-5">

                {user.image && (

                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-24 h-24 rounded-full"
                    />

                )}

                <div>

                    <h1 className="text-3xl font-bold">
                        {user.name}
                    </h1>

                    <p>{user.email}</p>

                    <p className="mt-2">
                        {user.headline}
                    </p>

                    <p className="mt-2">
                        {user.bio}
                    </p>

                </div>

            </div>

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                    My Blogs
                </h2>

                <div className="space-y-4">

                    {blogs.map((blog: any) => (

                        <Link
                            key={blog._id}
                            href={`/blogs/${blog._id}`}
                            className="block border rounded p-4 hover:bg-gray-50"
                        >

                            <h3 className="font-bold">
                                {blog.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {blog.content.substring(0, 120)}...
                            </p>

                        </Link>

                    ))}

                </div>

            </div>

        </main>

    );

}