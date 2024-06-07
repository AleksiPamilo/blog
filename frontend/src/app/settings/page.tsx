"use client";

import { useSession } from "next-auth/react";
import SettingsCard from "@/components/settings/Card";
import UnAuthenticated from "@/components/UnAuthenticated";
import EmailConfirmation from "@/components/settings/EmailConfirmation";

export default function Dashboard() {
    const { data: session } = useSession();

    if (!session?.user) {
        return (
            <UnAuthenticated />
        )
    }

    return (
        <div className="space-y-2">
            <SettingsCard
                title="Username"
                placeholder={session.user.name ?? undefined}
                description="Your username will be displayed publicly on the platform. Choose a unique identifier that represents you or your business."
                onSave={(v) => alert(v)}
            />

            <SettingsCard
                title="Email"
                placeholder={session.user.email ?? undefined}
                description="Your email will be used solely for authentication and password recovery. Please provide a valid email address."
                onSave={(v) => alert(v)}
            />

            <EmailConfirmation />
        </div>
    )
}
