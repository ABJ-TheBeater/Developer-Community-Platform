import { auth } from "@/auth";
import connectMongo from "@/lib/Mongoose";
import User from "@/models/User";
import Blog from "@/models/Blog";
import Community from "@/models/Community";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CommunityResponse , BlogResponse } from "@/types";

type Props = {
    params: Promise<{
        username: string;
    }>;
};

export default async function PublicProfilePage({
    params,
}: Props) {

    const { username } = await params;

    await connectMongo();

    const session = await auth();

    const user = await User.findOne({
        username,
    });

    if (!user) {

        notFound();

    }

    if (
        session?.user?.email &&
        session.user.email === user.email
    ) {

        redirect("/profile");

    }

    const blogs = await Blog.find({
        author: user._id,
    }).sort({
        createdAt: -1,
    });

    const communities = await Community.find({
        members: user._id,
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

                    <p>
                        @{user.username}
                    </p>

                    <p className="mt-2">
                        {user.headline || "Developer"}
                    </p>

                    <p className="mt-2">
                        {user.bio || "No bio yet."}
                    </p>

                    {Array.isArray(user.skills) && user.skills.length > 0 && (

                        <div className="mt-4">

                            <p className="font-semibold mb-2">
                                Skills:
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {user.skills.map((skill: string) => (

                                    <span
                                        key={skill}
                                        className="px-3 py-1 border border-white/20 rounded-md text-sm bg-white/5"
                                    >
                                        {skill}
                                    </span>

                                ))}

                            </div>

                        </div>

                    )} 

                    {user.github && (

                        <p className="mt-2">

                            <strong>GitHub:</strong>{" "}

                            <a
                                href={user.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {user.github}
                            </a>

                        </p>

                    )}

                    {user.linkedin && (

                        <p className="mt-2">

                            <strong>LinkedIn:</strong>{" "}

                            <a
                                href={user.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {user.linkedin}
                            </a>

                        </p>

                    )}

                </div>

            </div>

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                    Communities
                </h2>

                {communities.length === 0 ? (

                    <p>This developer hasn't joined any communities yet.</p>

                ) : (

                    <div className="flex flex-wrap gap-3">

                        {communities.map((community: CommunityResponse) => (

                            <Link
                                key={community._id}
                                href={`/communities/${community.slug}`}
                                className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800"
                            >
                                {community.name}
                            </Link>

                        ))}

                    </div>

                )}

            </div>

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                    Blogs
                </h2>

                <div className="space-y-4">

                    {blogs.length === 0 ? (

                        <p>No blogs yet.</p>

                    ) : (

                        blogs.map((blog: BlogResponse) => (

                            <Link
                                key={blog._id}
                                href={`/blogs/${blog._id}`}
                                className="block border rounded-xl p-4 hover:bg-white/10 transition"
                            >

                                <h3 className="font-bold text-lg">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    {blog.content.substring(0, 120)}...
                                </p>

                            </Link>

                        ))

                    )}

                </div>

            </div>

        </main>

    );

}