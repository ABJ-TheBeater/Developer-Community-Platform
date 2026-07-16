import Link from "next/link";
import { BlogResponse } from "@/types";

type Props = {
    blog: BlogResponse;
};

export default function BlogCard({
    blog,
}: Props) {

    const readingTime = Math.max(
        1,
        Math.ceil(blog.content.split(/\s+/).length / 200)
    );

    return (

        <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">

            <Link
                href={`/blogs/${blog._id}`}
                className="text-2xl font-bold hover:underline"
            >
                {blog.title}
            </Link>

            <p className="text-gray-600 mt-3">
                {blog.content.substring(0, 150)}...
            </p>

            {blog.tags?.length > 0 && (

                <div className="flex flex-wrap gap-2 mt-4">

                    {blog.tags.map((tag: string) => (

                        <span
                            key={tag}
                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>

                    ))}

                </div>

            )}

            <div className="flex justify-between items-center mt-5 text-sm text-gray-500">

                <span>

                    By{" "}

                    <Link
                        href={`/profile/${blog.author?.username}`}
                        className="text-blue-500 hover:underline"
                    >
                        {blog.author?.name}
                    </Link>

                </span>

                <span>
                    {new Date(blog.createdAt).toLocaleDateString()} • {readingTime} min read
                </span>

            </div>

        </div>

    );

}