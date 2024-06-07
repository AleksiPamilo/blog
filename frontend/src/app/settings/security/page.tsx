"use client";

import Link from "next/link"
import { Menu, Package2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AvatarDropdown from "@/components/AvatarDropdown";
import { useSession } from "next-auth/react";
import SettingsCard from "@/components/settings/Card";
import UnAuthenticated from "@/components/UnAuthenticated";

export default function SecuritySettings() {
    const { data: session } = useSession();

    if (!session?.user) {
        return (
            <UnAuthenticated />
        )
    }

    return (
        <div>
            <SettingsCard
                title="Password"
                description="Create a strong password to protect your account. Use at least 8 characters, including letters, numbers, and special symbols. You will need to confirm your password."
                confirmValue
                onSave={(v) => alert(v)}
            />
        </div>
    )
}
