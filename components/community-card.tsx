import Link from "next/link";
import { UserResponse } from "@/types";

type Props = {
    name: string;
    slug: string;
    category: string;
    description: string;
    members: UserResponse[];
    joined: boolean | null;
};

const CommunityCard = ({
    name,
    slug,
    category,
    description,
    members,
    joined,
}: Props) => {
    return (
        <div className="border border-white/10 rounded-xl bg-white/5 p-5 hover:bg-white/10 transition">

            <h2 className="text-2xl font-bold text-white">
                {name}
            </h2>

            <p className="text-blue-400 mt-2">
                {category}
            </p>

            <p className="text-xs text-gray-500 mt-1">
                @{slug}
            </p>

            <p className="text-gray-300 mt-4">
                {description}
            </p>

            <p className="text-sm text-gray-400 mt-4">
                👥 {members.length} member{members.length !== 1 ? "s" : ""}
            </p>

            <p className="mt-2 text-sm">
                {joined === null ? (
                    <span className="text-gray-500">
                        🔒 Sign in to join
                    </span>
                ) : joined ? (
                    <span className="text-green-400 font-medium">
                        🟢 Joined
                    </span>
                ) : (
                    <span className="text-yellow-400 font-medium">
                        ⚪ Not Joined
                    </span>
                )}
            </p>

            <Link
                href={`/communities/${slug}`}
                className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
                View Community
            </Link>

        </div>
    );
};

export default CommunityCard;