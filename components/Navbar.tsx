"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {

    const { data: session } = useSession();

    return (
        <header>
            <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link href="/">
                    <h1 className="text-2xl font-bold">
                        DevCommunity
                    </h1>
                </Link>

                <ul className="flex gap-4 text-sm items-center">

                    <Link href="/">
                        <li>Home</li>
                    </Link>

                    <Link href="/about">
                        <li>About</li>
                    </Link>

                    <Link href="/communities">
                        <li>Communities</li>
                    </Link>

                    <Link href="/topics">
                        <li>Topics</li>
                    </Link>

                    <Link href="/developers">
                        <li>Developers</li>
                    </Link>

                    {session ? (
                        <>
                            <li>
                                {session.user?.name}
                            </li>

                            {session.user?.image && (
                                <img
                                    src={session.user.image}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            )}

                            <button
                                onClick={() => signOut()}
                                className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                        >
                            Login
                        </button>
                    )}

                </ul>

            </nav>
        </header>
    );
};

export default Navbar;