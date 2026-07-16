import connectMongo from "@/lib/Mongoose";
import Blog from "@/models/Blog";

export const revalidate = 60;

const Page = async () => {

    await connectMongo();

    const blogs = await Blog.find({}, "tags");

    const topics = [...new Set(
        blogs.flatMap((blog: any) => blog.tags)
    )];

    return (

        <main className="max-w-6xl mx-auto px-6 py-12">

            <section className="space-y-3">

                <h1 className="text-4xl font-bold">
                    Explore Topics
                </h1>

                <p className="text-gray-600">
                    Discover trending topics and discussions in the developer community.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {topics.length === 0 ? (

                        <p>No topics available.</p>

                    ) : (

                        topics.map((topic: string) => (

                            <div
                                key={topic}
                                className="border rounded-xl bg-white p-5 space-y-3"
                            >

                                <h2 className="text-xl text-black font-semibold">
                                    {topic}
                                </h2>

                            </div>

                        ))

                    )}

                </div>

            </section>

        </main>

    );

};

export default Page;