"use client";

import { useSession } from "next-auth/react";
import SettingsCard from "@/components/settings/Card";
import UnAuthenticated from "@/components/UnAuthenticated";
import EmailConfirmation from "@/components/settings/EmailConfirmation";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
    const { data: session } = useSession();
    const [errors, setErrors] = useState<{ username: string | null } | null>(null);

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
                onSave={async (value) => {
                    const res = await fetch("/api/users/changeUsername", {
                        method: "POST",
                        body: JSON.stringify({
                            newUsername: value,
                        }),
                    });

                    const json = await res.json();
                    if (json?.error) {
                        const errMsg = json.error?.details ?? json.error?.message ?? "Unexpected error";
                        setErrors(prev => ({ ...prev, username: errMsg }));
                    } else if (json?.message) {
                        toast(json.message);
                        setErrors(null);
                    }
                }}

                errorMessage={errors?.username ?? undefined}
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
