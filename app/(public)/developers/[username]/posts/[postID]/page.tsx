import {developers} from "@/data/developers";
import {posts} from "@/data/posts";
type Props = {
    params: Promise<{username: string}>;
}
const page = async ({params}: Props) => {
    const {username} = await params;
    const developer = developers.find((item) => item.username === username);
    if(!developer){
        return <div>Developer not found</div>
    }
    const developerPosts = posts.filter((post) => post.username === username);
    return(
        <div>
            <h1>{developer.name}'s Posts</h1>
            <ul className="space-y-2">
                {developerPosts.map((post) => (
                    <li key={post.id} className="border rounded-xl bg-white p-4">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-600">{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )}
    export default page