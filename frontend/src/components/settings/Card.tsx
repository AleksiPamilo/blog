import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Errors } from "@/interfaces";

export default function SettingsCard({ title, description, placeholder, confirmValue, onSave, onError }: {
    title: string;
    description: string;
    placeholder?: string;
    confirmValue?: boolean;
    onSave?: (value: string | null) => void;
    onError?: (err: string) => void;
}) {
    const [value, setValue] = useState<string | null>(null);
    const [confirm, setConfirm] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSave = () => {
        setError(null);

        if (!value) {
            const errorMessage = Errors.Common.EmptyFields;
            setError(errorMessage);
            onError?.(errorMessage);
            return;
        }

        if (confirmValue) {
            if (!confirm) {
                const errorMessage = "Confirmation field cannot be empty!";
                setError(errorMessage);
                onError?.(errorMessage);
                return;
            }

            if (value !== confirm) {
                const errorMessage = Errors.Common.ValuesDontMatch;
                setError(errorMessage);
                onError?.(errorMessage);
                return;
            }
        }

        onSave?.(value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Input placeholder={placeholder ?? title} onChange={e => setValue(String(e.target.value))} />
                {confirmValue && <Input placeholder={`Confirm ${placeholder ?? title}`} onChange={e => setConfirm(String(e.target.value))} />}
                {error && <p className="text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleSave}>Save</Button>
            </CardFooter>
        </Card>
    )
}