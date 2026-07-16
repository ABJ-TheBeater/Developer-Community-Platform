"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
    id: string;
    joined: boolean;
};

export default function JoinButton({
    id,
    joined,
}: Props) {

    const { data: session } = useSession();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleJoin() {

        if (!session) {

            router.push("/login");

            return;

        }

        setLoading(true);

        try {

            const response = await fetch(
                `/api/communities/${id}`,
                {
                    method: "PATCH",
                }
            );

            if (response.ok) {

                toast.success(
                    joined
                        ? "Left community."
                        : "Joined community!"
                );

                router.refresh();

            } else {

                toast.error("Something went wrong.");

            }

        } catch {

            toast.error("Something went wrong.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <button
            onClick={handleJoin}
            disabled={loading}
            className={`px-5 py-2 rounded text-white transition ${
                joined
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >

            {loading
                ? "Loading..."
                : !session
                ? "Login to Join"
                : joined
                ? "Leave Community"
                : "Join Community"}

        </button>

    );

}