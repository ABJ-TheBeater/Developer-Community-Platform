import connectMongo from "@/lib/Mongoose";
import Community from "@/models/Community";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { auth } from "@/auth";
import JoinButton from "@/components/join-button";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

const Page = async ({
    params,
}: Props) => {

    const { slug } = await params;

    await connectMongo();

    const community = await Community
        .findOne({
            slug,
        })
        .populate("members");

    if (!community) {

        notFound();

    }

    const blogs = await Blog.find({
        tags: community.slug,
    })
        .populate("author")
        .sort({
            createdAt: -1,
        })
        .limit(5);

    const session = await auth();

    let joined = false;

    if (session?.user?.email) {

        const user = await User.findOne({
            email: session.user.email,
        });

        if (user) {

            joined = community.members.some(
                (member: any) =>
                    member._id.toString() ===
                    user._id.toString()
            );

        }

    }

    return (

        <section className="max-w-5xl mx-auto px-6 py-10 space-y-10">

            <div>

                <h1 className="text-4xl font-bold">
                    {community.name}
                </h1>

                <span className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {community.category}
                </span>

                <p className="mt-5 text-lg">
                    {community.description}
                </p>

                <p className="mt-5 text-gray-400">
                    👥 {community.members.length} member{community.members.length !== 1 ? "s" : ""}
                </p>

            </div>

            <JoinButton
                id={community._id.toString()}
                joined={joined}
            />

            <div>

                <h2 className="text-2xl font-bold mb-5">
                    Members
                </h2>

                {community.members.length === 0 ? (

                    <p>No members yet.</p>

                ) : (

                    <div className="flex flex-wrap gap-4">

                        {community.members.map((member: any) => (

                            <Link
                                key={member._id}
                                href={`/profile/${member.username}`}
                                className="bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition"
                            >

                                <p className="font-semibold">
                                    {member.name}
                                </p>

                                <p className="text-sm text-gray-400">
                                    @{member.username}
                                </p>

                            </Link>

                        ))}

                    </div>

                )}

            </div>

            <div>

                <h2 className="text-2xl font-bold mb-5">
                    Related Blogs
                </h2>

                {blogs.length === 0 ? (

                    <p>No related blogs for this community yet.</p>

                ) : (

                    <div className="space-y-4">

                        {blogs.map((blog: any) => (

                            <Link
                                key={blog._id}
                                href={`/blogs/${blog._id}`}
                                className="block border rounded-xl p-5 hover:bg-white/10 transition"
                            >

                                <h3 className="text-xl font-bold">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    By {blog.author.name}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-4">

                                    {blog.tags.map((tag: string) => (

                                        <span
                                            key={tag}
                                            className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
                                        >
                                            {tag}
                                        </span>

                                    ))}

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </div>

        </section>

    );

};

export default Page;