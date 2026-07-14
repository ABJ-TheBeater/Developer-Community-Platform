"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlogPage() {

    const { id } = useParams();

    const router = useRouter();

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [tags, setTags] = useState("");

    useEffect(() => {

        async function fetchBlog() {

            const response = await fetch(`/api/blogs/${id}`);

            const data = await response.json();

            setTitle(data.title);

            setContent(data.content);

            setTags(data.tags.join(", "));

        }

        fetchBlog();

    }, [id]);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        const response = await fetch(
            `/api/blogs/${id}`,
            {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({

                    title,

                    content,

                    tags: tags
                        .split(",")
                        .map(tag => tag.trim())
                        .filter(tag => tag !== ""),

                }),

            }
        );

        if (response.ok) {

            router.push(`/blogs/${id}`);

            router.refresh();

        } else {

            alert("Failed to update blog.");

        }

    }

    return (

        <main className="max-w-3xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-bold mb-8">
                Edit Blog
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div>

                    <label className="block mb-2">
                        Title
                    </label>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="w-full border rounded p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2">
                        Content
                    </label>

                    <textarea
                        rows={8}
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        className="w-full border rounded p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2">
                        Tags
                    </label>

                    <input
                        value={tags}
                        onChange={(e) =>
                            setTags(e.target.value)
                        }
                        className="w-full border rounded p-3"
                    />

                </div>

                <button
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    Save Changes
                </button>

            </form>

        </main>

    );

}