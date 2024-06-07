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

export default function AvatarDropdown({ image, user, text = false }: { image?: string | null, user: DefaultSession["user"], text?: boolean }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-3 items-center hover:cursor-pointer group">
                    <div className="group-hover:underline" hidden={!!!text}>My Profile</div>
                    <Avatar image={image} />
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
                        <Link href="/settings" className={style}>
                            Settings
                        </Link>
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