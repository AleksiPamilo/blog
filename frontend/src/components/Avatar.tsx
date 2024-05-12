import {
    Avatar as ShadCnAvatar,
    AvatarImage,
    AvatarFallback
} from "./ui/avatar";

import { DefaultSession } from "next-auth";

export default function Avatar({ image, user, className }: { image?: string | null, user: DefaultSession["user"], className?: string }) {
    const fallbackText = user && user.name ? getFallback(user.name) : "";

    return (
        <ShadCnAvatar className={className}>
            <AvatarImage src={image ?? undefined} />
            <AvatarFallback>{fallbackText}</AvatarFallback>
        </ShadCnAvatar>
    )
}

function getFallback(username: string) {
    const parts = username.split(" ");
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    } else {
        return parts
            .map((part) => part.charAt(0).toUpperCase())
            .join("")
            .slice(0, 2);
    }
}