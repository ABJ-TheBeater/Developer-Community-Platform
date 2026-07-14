"use client";

import { useRouter } from "next/navigation";

export default function EditDeleteButtons({
    id,
}: {
    id: string;
}) {

    const router = useRouter();

    async function handleDelete() {

        const confirmed = confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) return;

        const response = await fetch(
            `/api/blogs/${id}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {

            router.push("/blogs");
            router.refresh();

        } else {

            alert("Failed to delete blog.");

        }

    }

    return (

        <div className="flex gap-3 mt-8">

            <button
                onClick={() =>
                    router.push(`/blogs/${id}/edit`)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Edit
            </button>

            <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
            >
                Delete
            </button>

        </div>

    );

}