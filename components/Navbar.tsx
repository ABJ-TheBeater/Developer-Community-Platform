"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

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

                    <Link href="/blogs">
                        <li>Blogs</li>
                    </Link>

                    <Link href="/topics">
                        <li>Topics</li>
                    </Link>

                    <Link href="/developers">
                        <li>Developers</li>
                    </Link>

                    {session ? (
                        <>

                            <Link
                                href="/profile"
                                className="flex items-center gap-2"
                            >

                                {session.user?.image && (
                                    <img
                                        src={session.user.image}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}

                                <span>
                                    {session.user?.name}
                                </span>

                            </Link>

                            <button
                                onClick={() => signOut({ callbackUrl: "/", })}
                                className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                            >
                                Logout
                            </button>

                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                            Login
                        </Link>
                    )}

                </ul>

            </nav>
        </header>
    );
};

export default Navbar;