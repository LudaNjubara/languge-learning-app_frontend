"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavigaton() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-row gap-4">
        <li>
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "text-white bg-neutral-500/30"
                : "text-neutral-300 hover:text-white hover:bg-neutral-500/25 transition-colors duration-300"
            } py-2 px-4 rounded-md`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/dictionary"
            className={`${
              pathname === "/dictionary"
                ? "text-white bg-neutral-500/30"
                : "text-neutral-300 hover:text-white hover:bg-neutral-500/25 transition-colors duration-300"
            } py-2 px-4 rounded-md`}
          >
            Dictionary
          </Link>
        </li>
        <li>
          <Link
            href="/quiz"
            className={`${
              pathname === "/quiz"
                ? "text-white bg-neutral-500/30"
                : "text-neutral-300 hover:text-white hover:bg-neutral-500/25 transition-colors duration-300"
            } py-2 px-4 rounded-md`}
          >
            Quiz
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className={`${
              pathname === "/settings"
                ? "text-white bg-neutral-500/30"
                : "text-neutral-300 hover:text-white hover:bg-neutral-500/25 transition-colors duration-300"
            } py-2 px-4 rounded-md`}
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
