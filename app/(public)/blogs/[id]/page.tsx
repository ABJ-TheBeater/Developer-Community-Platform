import connectMongo from "@/lib/Mongoose";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { auth } from "@/auth";
import EditDeleteButtons from "@/components/EditDeleteButtons";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        id: string;
    }>;
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
                By {blog.author?.name}
            </p>

            <div className="mt-8 whitespace-pre-wrap">
                {blog.content}
            </div>

            <div className="flex gap-2 mt-8">

                {blog.tags.map((tag: string) => (

                    <span
                        key={tag}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
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

        </main>

    );

}