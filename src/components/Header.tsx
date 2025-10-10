"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  // const { data: session } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white dark:bg-neutral-950">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-[1600px] mx-auto">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-1 font-bold text-xl">
            <Image
              src="/imgs/youtube.png"
              alt="YouTube"
              width={40}
              height={30}
              className="dark:invert-0"
            />
            <span className="hidden sm:inline text-gray-900 dark:text-gray-100">
              YouTube
            </span>
          </Link>
        </div>

        {/* CENTER: Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center flex-1 max-w-2xl mx-4"
        >
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-10 rounded-l-full border border-gray-300 dark:border-neutral-700 px-4 text-sm bg-transparent outline-none focus:border-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="h-10 w-14 flex items-center justify-center border border-l-0 border-gray-300 dark:border-neutral-700 rounded-r-full bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197M17.803 9.401a8.4 8.4 0 1 1-16.8 0 8.4 8.4 0 0 1 16.8 0z"
              />
            </svg>
          </button>
        </form>

        {/* RIGHT: Icons */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.828 14.828a4 4 0 1 1-5.656-5.656m5.656 5.656L21 21"
              />
            </svg>
          </button>

          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0"
              />
            </svg>
          </button>

          {false ? (
            <button
              // onClick={() => signOut()}
              className="rounded-full overflow-hidden w-8 h-8"
            >
              {/* <Image
                src={session.user.image || "/default-avatar.png"}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="rounded-full object-cover w-full h-full"
              /> */}
            </button>
          ) : (
            <button
              // onClick={() => signIn("google")}
              className="px-3 py-1 rounded-full border border-gray-300 text-sm hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
