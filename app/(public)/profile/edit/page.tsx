"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProfilePage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [bio, setBio] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [skills, setSkills] = useState("");

    useEffect(() => {

        async function loadProfile() {

            const response = await fetch("/api/profile");

            const data = await response.json();

            setName(data.name || "");
            setHeadline(data.headline || "");
            setBio(data.bio || "");
            setGithub(data.github || "");
            setLinkedin(data.linkedin || "");
            setSkills(data.skills?.join(", ") || "");

        }

        loadProfile();

    }, []);

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        const response = await fetch(
            "/api/profile",
            {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({

                    name,
                    headline,
                    bio,
                    github,
                    linkedin,

                    skills: skills
                        .split(",")
                        .map(skill => skill.trim())
                        .filter(skill => skill !== ""),

                }),

            }
        );

        if (response.ok) {
            toast.success("Profile updated!");
            router.push("/profile");
            router.refresh();

        } else {

            toast.error("Failed to update profile.");

        }

    }

    return (

        <main className="max-w-3xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-bold mb-8">
                Edit Profile
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="Name"
                    className="w-full border rounded p-3"
                />

                <input
                    value={headline}
                    onChange={(e) =>
                        setHeadline(e.target.value)
                    }
                    placeholder="Headline"
                    className="w-full border rounded p-3"
                />

                <textarea
                    rows={6}
                    value={bio}
                    onChange={(e) =>
                        setBio(e.target.value)
                    }
                    placeholder="Bio"
                    className="w-full border rounded p-3"
                />

                <input
                    value={github}
                    onChange={(e) =>
                        setGithub(e.target.value)
                    }
                    placeholder="GitHub URL"
                    className="w-full border rounded p-3"
                />

                <input
                    value={linkedin}
                    onChange={(e) =>
                        setLinkedin(e.target.value)
                    }
                    placeholder="LinkedIn URL"
                    className="w-full border rounded p-3"
                />

                <input
                    value={skills}
                    onChange={(e) =>
                        setSkills(e.target.value)
                    }
                    placeholder="Skills (React, Next.js, MongoDB)"
                    className="w-full border rounded p-3"
                />

                <button
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    Save Changes
                </button>

            </form>

        </main>

    );

}