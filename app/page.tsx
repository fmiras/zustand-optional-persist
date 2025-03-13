"use client";

import { useCounterStore } from "./store";

export default function Home() {
  const { counter, increment, reset, isLoading } = useCounterStore({
    persist: true,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center mt-8">
          Zustand Store with LocalStorage Example
        </h1>

        {/* Counter Example */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Counter Example</h2>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold">{counter}</div>
            <div className="space-x-2">
              <button
                onClick={increment}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Increment
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Reset
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This counter is managed by Zustand and persists across page
            refreshes using localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
