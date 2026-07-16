"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

const loginSchema = z.object({
    terms: z.boolean().refine((value) => value === true, {
        message: "You must accept the Terms and Conditions.",
    }),
});

export default function LoginPage() {

    const [terms, setTerms] = useState(false);
    const [termsError, setTermsError] = useState("");
    const [oauthError, setOauthError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignIn(
        provider: "github" | "google"
    ) {

        setTermsError("");
        setOauthError("");

        const result = loginSchema.safeParse({
            terms,
        });

        if (!result.success) {

            const errors = result.error.flatten().fieldErrors;

            setTermsError(errors.terms?.[0] || "");

            return;

        }

        try {

            setLoading(true);

            await signIn(provider, {
                callbackUrl: "/",
            });

        } catch {

            setOauthError(
                "Authentication failed. Please try again."
            );

            setLoading(false);

        }

    }

    return (

        <main className="max-w-md mx-auto py-20 px-6">

            <h1 className="text-3xl font-bold text-center mb-3">
                Sign In
            </h1>

            <p className="text-gray-400 text-center mb-8">
                Continue with your preferred authentication provider.
            </p>

            <div className="space-y-5">

                <div>

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            checked={terms}
                            onChange={(e) =>
                                setTerms(e.target.checked)
                            }
                        />

                        <span>
                            I agree to the Terms and Conditions
                        </span>

                    </label>

                    {termsError && (

                        <p className="text-red-500 text-sm mt-1">
                            {termsError}
                        </p>

                    )}

                </div>

                {oauthError && (

                    <p className="text-red-500 text-center text-sm">
                        {oauthError}
                    </p>

                )}

                <button
                    disabled={loading}
                    onClick={() =>
                        handleSignIn("github")
                    }
                    className="w-full bg-black text-white py-3 rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading
                        ? "Signing in..."
                        : "Continue with GitHub"}
                </button>

                <button
                    disabled={loading}
                    onClick={() =>
                        handleSignIn("google")
                    }
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading
                        ? "Signing in..."
                        : "Continue with Google"}
                </button>

            </div>

        </main>

    );

}