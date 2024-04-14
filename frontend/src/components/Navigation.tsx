"use client";

import NavItems from "@/common/NavItems";
import Link from "next/link";
import Login from "./auth/Login";
import MobileNavigation from "./MobileNavigation";

export default function Navigation() {
  return (
    <>
      <nav className="max-md:hidden w-full md:flex items-center justify-between py-3 px-6 bg-white rounded-b-lg">
        <div className="font-semibold text-2xl">LOGO</div>
        <div className="flex gap-4">
          <ul className="flex items-start justify-center gap-4">
            {NavItems.map(({ name, path }) => (
              <Link
                key={name}
                href={path}
                className="rounded-lg px-3 py-2 text-zinc-700 font-medium hover:bg-zinc-100 hover:text-zinc-900"
              >
                {name}
              </Link>
            ))}
          </ul>

          <Login />
        </div>
      </nav>

      <nav className="max-md:block hidden">
        <MobileNavigation />
      </nav>
    </>
  );
}
