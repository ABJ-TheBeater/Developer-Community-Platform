"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="border-b">
            <nav className="max-w-6xl mx-auto px-6 py-4">

                {/* Desktop Navbar */}
                <div className="hidden md:flex justify-between items-center">

                    <Link href="/">
                        <h1 className="text-2xl font-bold">
                            DevCommunity
                        </h1>
                    </Link>

                    <ul className="flex gap-4 text-sm items-center">

                        <Link href="/"><li>Home</li></Link>
                        <Link href="/about"><li>About</li></Link>
                        <Link href="/communities"><li>Communities</li></Link>
                        <Link href="/blogs"><li>Blogs</li></Link>
                        <Link href="/topics"><li>Topics</li></Link>
                        <Link href="/developers"><li>Developers</li></Link>

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
                                    onClick={() =>
                                        signOut({ callbackUrl: "/" })
                                    }
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
                </div>

                {/* Mobile Navbar */}
                <div className="md:hidden">

                    <div className="flex justify-between items-center">

                        <Link href="/">
                            <h1 className="text-xl font-bold">
                                DevCommunity
                            </h1>
                        </Link>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-3xl font-bold"
                        >
                            ☰
                        </button>

                    </div>

                    {menuOpen && (
                        <div className="mt-4 flex flex-col gap-3 text-sm">

                            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                            <Link href="/communities" onClick={() => setMenuOpen(false)}>Communities</Link>
                            <Link href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
                            <Link href="/topics" onClick={() => setMenuOpen(false)}>Topics</Link>
                            <Link href="/developers" onClick={() => setMenuOpen(false)}>Developers</Link>

                            {session ? (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setMenuOpen(false)}
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
                                        onClick={() =>
                                            signOut({ callbackUrl: "/" })
                                        }
                                        className="bg-red-500 text-white px-3 py-2 rounded w-fit"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-blue-600 text-white px-3 py-2 rounded w-fit"
                                >
                                    Login
                                </Link>
                            )}

                        </div>
                    )}

                </div>

            </nav>
        </header>
    );
};

export default Navbar;