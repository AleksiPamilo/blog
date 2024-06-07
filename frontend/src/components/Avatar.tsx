import {
    Avatar as ShadCnAvatar,
    AvatarImage,
    AvatarFallback
} from "./ui/avatar";

import { DefaultSession } from "next-auth";
import { CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Avatar({ image, className }: { image?: string | null, className?: string }) {
    return (
        <ShadCnAvatar className={cn("w-8 h-8 rounded-full", className)} >
            <AvatarImage src={image ?? undefined} className="ring-2" />
            <AvatarFallback>
                <div className="w-full h-full flex items-center justify-center">
                    <CircleUser className="w-full h-full" />
                    <span className="sr-only">Toggle user menu</span>
                </div>
            </AvatarFallback>
        </ShadCnAvatar>
    )
}