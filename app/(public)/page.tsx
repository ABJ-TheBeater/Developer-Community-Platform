import Link from "next/link";
import connectMongo from "@/lib/Mongoose";
import User from "@/models/User";
import Blog from "@/models/Blog";
import Community from "@/models/Community";

export const revalidate = 60;

const Page = async () => {

    await connectMongo();

    const [developers, blogs, communities, recentBlogs, featuredCommunities] =
        await Promise.all([
            User.countDocuments(),
            Blog.countDocuments(),
            Community.countDocuments(),
            Blog.find()
                .populate("author")
                .sort({ createdAt: -1 })
                .limit(3),
            Community.find()
                .sort({ createdAt: -1 })
                .limit(3),
        ]);

    return (

        <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">

            <section className="space-y-6">

                <h1 className="text-5xl font-bold">
                    Welcome to Developer Community Platform
                </h1>

                <p className="text-lg text-gray-400 max-w-3xl">
                    Connect with developers, join communities, share technical blogs,
                    and grow your programming skills together.
                </p>

                <div className="flex gap-6">

                    <Link
                        href="/communities"
                        className="text-blue-500 hover:underline"
                    >
                        Browse Communities
                    </Link>

                    <Link
                        href="/developers"
                        className="text-blue-500 hover:underline"
                    >
                        Browse Developers
                    </Link>

                </div>

            </section>

            <section>

                <h2 className="text-2xl font-bold mb-6">
                    Platform Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Link
                        href="/developers"
                        className="border rounded-xl p-6 text-center hover:border-blue-500 hover:bg-white/5 transition"
                    >

                        <h3 className="text-4xl font-bold">
                            {developers}
                        </h3>

                        <p className="text-gray-400 mt-2">
                            Developers
                        </p>

                    </Link>

                    <Link
                        href="/blogs"
                        className="border rounded-xl p-6 text-center hover:border-blue-500 hover:bg-white/5 transition"
                    >

                        <h3 className="text-4xl font-bold">
                            {blogs}
                        </h3>

                        <p className="text-gray-400 mt-2">
                            Blogs
                        </p>

                    </Link>

                    <Link
                        href="/communities"
                        className="border rounded-xl p-6 text-center hover:border-blue-500 hover:bg-white/5 transition"
                    >

                        <h3 className="text-4xl font-bold">
                            {communities}
                        </h3>

                        <p className="text-gray-400 mt-2">
                            Communities
                        </p>

                    </Link>

                </div>

            </section>

            <section>

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        Featured Communities
                    </h2>

                    <Link
                        href="/communities"
                        className="text-blue-500 hover:underline"
                    >
                        View All
                    </Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {featuredCommunities.map((community: any) => (

                        <Link
                            key={community._id}
                            href={`/communities/${community.slug}`}
                            className="border rounded-xl p-5 hover:border-blue-500 transition"
                        >

                            <h3 className="text-xl font-semibold">
                                {community.name}
                            </h3>

                            <p className="text-gray-400 mt-2">
                                {community.description}
                            </p>

                            <p className="text-sm text-gray-500 mt-3">
                                {community.category}
                            </p>

                        </Link>

                    ))}

                </div>

            </section>

            <section>

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        Recent Blogs
                    </h2>

                    <Link
                        href="/blogs"
                        className="text-blue-500 hover:underline"
                    >
                        View All
                    </Link>

                </div>

                <div className="space-y-5">

                    {recentBlogs.map((blog: any) => (

                        <div
                            key={blog._id}
                            className="border rounded-xl p-5"
                        >

                            <Link
                                href={`/blogs/${blog._id}`}
                                className="text-2xl font-bold hover:underline"
                            >
                                {blog.title}
                            </Link>

                            <p className="text-gray-400 mt-3">
                                {blog.content.substring(0, 140)}...
                            </p>

                            <p className="text-sm text-gray-500 mt-4">
                                By{" "}
                                <Link
                                    href={`/profile/${blog.author.username}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {blog.author.name}
                                </Link>
                            </p>

                        </div>

                    ))}

                </div>

            </section>

        </main>

    );

};

export default Page;