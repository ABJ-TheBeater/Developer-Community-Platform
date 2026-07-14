import { developers } from "@/data/developers";
import { posts } from "@/data/posts";
import Link from "next/link";
const page = async ({ params }: { params: { username: string } }) => {
    const { username } = await params;
    const developer = developers.find((item) => item.username === username);
    if (!developer) {
        return <div>Developer not found</div>;
    }
    const developerPosts = posts.filter((post) => post.username === username);
  return (
    <section className="space-y-4">
        <h1 className="text-2xl font-bold">{developer.name}</h1>
        <p>{developer.bio}</p>
        <p>Title: {developer.title}</p> 
        <ul className="space-y-2">
            {developerPosts.map((post) => (
                <div key={post.id} className="border rounded-xl bg-white p-4">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-600">{post.content}</p>
                    <Link href={`/developers/${username}/posts/${post.id}`} className="text-blue-500 hover:underline">Read More</Link>
                </div>
            ))}
        </ul>
    </section>
  )
}

export default page