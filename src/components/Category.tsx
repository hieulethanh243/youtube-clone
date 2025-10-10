"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CategoryBarClient({
  categories,
}: {
  categories: { id: string; title: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [active, setActive] = useState("all");

  useEffect(() => {
    const q = params.get("q");
    if (q) setActive(q);
  }, [params]);

  const handleClick = (title: string) => {
    setActive(title);
    if (title === "All") router.push("/");
    else router.push(`/search?q=${encodeURIComponent(title)}`);
  };

  return (
    <div className="sticky overflow-hidden top-16 z-30 bg-white dark:bg-neutral-950">
      <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide category-scroll">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.title)}
            className={`cursor-pointer px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition ${
              active === cat.title
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
