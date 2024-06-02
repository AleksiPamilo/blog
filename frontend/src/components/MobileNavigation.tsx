import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Login from "./auth/Login";
import { useSession } from "next-auth/react";
import AvatarDropdown from "./AvatarDropdown";
import generateNavItems from "@/common/NavItems";

export default function MobileNavigation() {
    const { data: session } = useSession();

    return (
        <Sheet>
            <div className="fixed z-50 top-0 left-0 w-full flex items-center justify-between p-2">
                <div className="font-semibold text-2xl">LOGO</div>
                <SheetTrigger asChild>
                    <Button variant="ghost"><Menu /></Button>
                </SheetTrigger>
            </div>
            <SheetContent>
                <SheetHeader className="flex h-full items-center justify-center">
                    <SheetDescription>
                        <div className="flex flex-col h-full items-start justify-center gap-4">
                            {generateNavItems(session?.user?.slug).map(({ name, path, icon }) => (
                                <SheetClose asChild key={name}>
                                    <Link
                                        href={path}
                                        className="w-full flex gap-2 items-center rounded-lg px-3 py-2 text-zinc-700 font-medium hover:bg-zinc-100 hover:text-zinc-900"
                                    >
                                        {icon && <span className="w-6 h-6">{icon}</span>}
                                        <p>{name}</p>
                                    </Link>
                                </SheetClose>
                            ))}

                            {
                                !session?.user || !session?.user?.name
                                    ? <Login />
                                    : <div className="bottom-5 right-5 absolute flex gap-2">
                                        <AvatarDropdown image={session.user.image} user={session.user} text />
                                    </div>
                            }
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}