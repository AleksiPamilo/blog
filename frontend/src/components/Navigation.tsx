"use client";

import NavItems from "@/common/NavItems";
import Link from "next/link";
import Login from "./auth/Login";
import MobileNavigation from "./MobileNavigation";
import { useSession } from "next-auth/react";
import AvatarDropdown from "./AvatarDropdown";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="max-md:hidden w-full md:flex items-center justify-between py-3 px-6 bg-white rounded-b-lg">
        <div className="font-semibold text-2xl">LOGO</div>
        <div className="flex gap-4">
          <ul className="flex items-start justify-center gap-4">
            {NavItems.map(({ name, path, icon }) => (
              <Link
                key={name}
                href={path}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-700 font-medium hover:bg-zinc-100 hover:text-zinc-900"
              >
                <p className="w-6 h-6">{icon}</p>
                <p>{name}</p>
              </Link>
            ))}
          </ul>

          {
            !session?.user || !session?.user?.name
              ? <Login />
              : <AvatarDropdown image={session.user.image} user={session.user} />
          }

        </div>
      </nav>

      <nav className="max-md:block hidden">
        <MobileNavigation />
      </nav>
    </>
  );
}
