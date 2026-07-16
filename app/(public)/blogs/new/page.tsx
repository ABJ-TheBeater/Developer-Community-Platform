"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewBlogPage() {

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        const response = await fetch("/api/blogs", {

            method: "POST",

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

        });

        if (response.ok) {
            toast.success("Blog created!");
            router.push("/blogs");

        } else {

            toast.error("Failed to create blog.");

        }

    }

    return (

        <main className="max-w-3xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-bold mb-8">
                Create Blog
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
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded p-3"
                        required
                    />

                </div>

                <div>

                    <label className="block mb-2">
                        Content
                    </label>

                    <textarea
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded p-3"
                        required
                    />

                </div>

                <div>

                    <label className="block mb-2">
                        Tags (comma separated)
                    </label>

                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border rounded p-3"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    Publish Blog
                </button>

            </form>

        </main>

    );

}