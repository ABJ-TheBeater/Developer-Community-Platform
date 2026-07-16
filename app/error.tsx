"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold">
        Something went wrong.
      </h1>

      <button
        onClick={reset}
        className="bg-red-600 text-white px-4 py-2 rounded mt-5"
      >
        Try Again
      </button>
    </main>
  );
}