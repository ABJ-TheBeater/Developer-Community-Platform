import Link from "next/link";

type Props = {
    username: string;
    name: string;
    title: string;
    bio: string;
};

const DeveloperCard = ({
    username,
    name,
    title,
    bio,
}: Props) => {

    return (

        <div className="border rounded-xl bg-white p-5 space-y-3">

            <h2 className="text-xl text-black font-semibold">
                {name}
            </h2>

            <p className="text-gray-600">
                {bio || "No bio yet."}
            </p>

            <p className="text-sm text-gray-500">
                {title || "Developer"}
            </p>

            <Link
                href={`/profile/${username}`}
                className="text-blue-500 hover:underline"
            >
                View Profile
            </Link>

        </div>

    );

};

export default DeveloperCard;