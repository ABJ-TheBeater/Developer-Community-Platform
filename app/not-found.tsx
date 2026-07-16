import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto p-10 text-center">
      <h1 className="text-4xl font-bold">
        404
      </h1>

      <p className="mt-4">
        Page not found.
      </p>

      <Link
        href="/"
        className="text-blue-600 underline mt-6 inline-block"
      >
        Go Home
      </Link>
    </main>
  );
}