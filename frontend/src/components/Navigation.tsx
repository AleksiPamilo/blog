// Todo: Mobile Navigation

"use client";

import NavItems from "@/common/NavItems";
import Link from "next/link";
import Login from "./auth/Login";

export default function Navigation() {
    return (
        <nav className="fixed top-0 w-full flex items-center justify-between py-3 px-6 bg-white rounded-b-lg">
            <div className="font-semibold text-2xl">LOGO</div>
            <div className="flex gap-4">
                <ul className="flex items-center justify-center gap-4">
                    {NavItems.map(([title, url]) => (
                        <Link key={title} href={url} className="rounded-lg px-3 py-2 text-zinc-700 font-medium hover:bg-zinc-100 hover:text-zinc-900">{title}</Link>
                    ))}
                </ul>

                <Login />
            </div>
        </nav>
    )
}