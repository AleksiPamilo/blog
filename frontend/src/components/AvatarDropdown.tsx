import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";

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

const style = "w-full cursor-pointer";

export default function AvatarDropdown({ image, user }: { image?: string | null, user: DefaultSession["user"] }) {
    const fallbackText = user && user.name ? getFallback(user.name) : "";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer hover:scale-105 hover:shadow-[0_0_5px_2px_#27272a]">
                    <AvatarImage src={image ?? undefined} />
                    <AvatarFallback>{fallbackText}</AvatarFallback>
                </Avatar>
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

function getFallback(username: string) {
    const parts = username.split(" ");

    if (parts.length > 1) {
        const firstLetter = parts[0][0].toUpperCase();
        const secondLetter = parts[1][0].toUpperCase();
        return firstLetter + secondLetter;
    } else {
        const firstLetter = username.charAt(0).toUpperCase();
        const secondLetter = username.length > 1 ? username.charAt(1).toLowerCase() : '';
        return firstLetter + secondLetter;
    }
}