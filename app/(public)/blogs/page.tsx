import Link from "next/link";
import connectMongo from "@/lib/Mongoose";
import Blog from "@/models/Blog";
import BlogCard from "@/components/BlogCard";

export const revalidate = 60;

type Props = {
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
};

export default async function BlogsPage({
    searchParams,
}: Props) {

    const { search, page } = await searchParams;

    await connectMongo();

    const currentPage = Number(page) || 1;
    const limit = 5;

    const query = search
        ? {
              title: {
                  $regex: search,
                  $options: "i",
              },
          }
        : {};

    const totalBlogs = await Blog.countDocuments(query);

    const blogs = await Blog.find(query)
        .populate("author")
        .sort({
            createdAt: -1,
        })
        .skip((currentPage - 1) * limit)
        .limit(limit);

    const totalPages = Math.ceil(totalBlogs / limit);

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

            <form className="mb-8">

                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search blogs..."
                    className="border rounded px-4 py-2 w-full"
                />

            </form>

            <div className="space-y-6">

                {blogs.length === 0 ? (

                    <p>No blogs found.</p>

                ) : (

                    blogs.map((blog: any) => (

                        <BlogCard
                            key={blog._id}
                            blog={blog}
                        />

                    ))

                )}

            </div>

            {totalPages > 1 && (

                <div className="flex justify-between mt-10">

                    {currentPage > 1 ? (

                        <Link
                            href={`/blogs?page=${currentPage - 1}${search ? `&search=${search}` : ""}`}
                            className="text-blue-500 hover:underline"
                        >
                            ← Previous
                        </Link>

                    ) : (

                        <div />

                    )}

                    <span className="text-gray-500">
                        Page {currentPage} of {totalPages}
                    </span>

                    {currentPage < totalPages ? (

                        <Link
                            href={`/blogs?page=${currentPage + 1}${search ? `&search=${search}` : ""}`}
                            className="text-blue-500 hover:underline"
                        >
                            Next →
                        </Link>

                    ) : (

                        <div />

                    )}

                </div>

            )}

        </main>

    );

}