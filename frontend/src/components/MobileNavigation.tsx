import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import NavItems from "@/common/NavItems";
import Link from "next/link";
import Login from "./auth/Login";

export default function MobileNavigation() {
    return (
        <Sheet>
            <div className="absolute z-50 top-0 left-0 w-full flex items-center justify-between p-2">
                <div className="font-semibold text-2xl">LOGO</div>
                <SheetTrigger asChild>
                    <Button variant="ghost"><Menu /></Button>
                </SheetTrigger>
            </div>
            <SheetContent>
                <SheetHeader className="flex h-full items-center justify-center">
                    <SheetDescription>
                        <ul className="flex flex-col h-full items-start justify-center gap-4">
                            {NavItems.map(({ name, path, icon }) => (
                                <li key={name}><Link
                                    href={path}
                                    className="flex gap-2 items-center rounded-lg px-3 py-2 text-zinc-700 font-medium hover:bg-zinc-100 hover:text-zinc-900"
                                >
                                    {icon && <span className="w-6 h-6">{icon}</span>}
                                    <p>{name}</p>
                                </Link></li>
                            ))}

                            <li className="w-full"><Login /></li>
                        </ul>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}