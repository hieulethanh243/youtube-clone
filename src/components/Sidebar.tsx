"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

const sidebarItems = [
  { name: "Home", icon: "/icons/home.png", href: "/" },
  { name: "Shorts", icon: "/icons/shorts.png", href: "/shorts" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-16 left-0 z-40 w-20 md:w-56 hidden md:block bg-white dark:bg-neutral-950 h-[calc(100vh-4rem)]">
      <nav className="flex flex-col gap-1 p-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "flex flex-col md:flex-row items-center justify-center md:justify-start md:gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all",
              pathname === item.href &&
                "bg-gray-200 dark:bg-neutral-800 font-semibold"
            )}
          >
            <Image
              src={item.icon}
              alt={item.name}
              className="text-xl"
              width={24}
              height={24}
            />
            <span className="text-xs md:text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
