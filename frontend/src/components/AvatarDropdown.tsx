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

const style = "w-full cursor-pointer";

export default function AvatarDropdown({ image, user }: { image?: string | null, user: DefaultSession["user"] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <Avatar image={image} user={user} className="hover:cursor-pointer hover:scale-105 hover:shadow-[0_0_5px_2px_#27272a]" />
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