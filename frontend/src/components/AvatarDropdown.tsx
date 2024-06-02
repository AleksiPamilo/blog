import Avatar from "./Avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import createSlug from "@/utils/createSlug";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const style = "w-full cursor-pointer";

export default function AvatarDropdown({ image, user, text = false }: { image?: string | null, user: DefaultSession["user"], text?: boolean }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-3 items-center hover:cursor-pointer group">
                    <div className="group-hover:underline" hidden={!!!text}>My Profile</div>
                    <div className="ring-2 ring-offset-2 rounded-full group-hover:ring-0">
                        <Avatar image={image} user={user} className="group-hover:scale-105 group-hover:shadow-[0_0_5px_2px_#27272a]" />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={"/@" + createSlug(user?.name!)} className={style}>
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/@" + createSlug(user?.name!) + "/drafts"} className={style}>
                            My Drafts
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <button className={style} onClick={() => alert("TODO : )\nThe other options work though!")}>
                            Settings
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <button className={style} onClick={() => signOut({ redirect: false })}>
                        Log out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}