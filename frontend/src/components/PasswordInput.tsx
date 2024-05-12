import React, { useState } from "react";
import { Input } from "./ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps {
    label?: string;
    onEnter?: () => void;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ label, onEnter, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="relative">
            <Input
                {...props}
                ref={ref}
                type={showPassword ? "text" : "password"}
                placeholder={label ?? "Password"}
                onEnter={() => onEnter?.()}
            />
            <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-zinc-600 text-xl"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;