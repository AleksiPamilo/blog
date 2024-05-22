import { cn } from "@/lib/utils";
import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type RadioOptions = {
    label: string;
    value: string;
}

type RadioProps = {
    defaultValue: string,
    options: RadioOptions[],
    onChange?: (value: string) => void;
}

export default function Radio({ defaultValue, options, onChange }: RadioProps) {
    const [value, setValue] = useState<string | undefined>(undefined);
    const radioStyle = cn(buttonVariants({ variant: "default", size: "default" }), "peer-aria-checked:bg-primary bg-primary/80 cursor-pointer");

    return (
        <RadioGroup
            className="flex items-center gap-4"
            defaultValue={defaultValue}
            value={value}
            onValueChange={(value) => {
                setValue(value);
                onChange?.(value);
            }}
        >
            <div className="flex items-center gap-2">
                {options.map((option) => (
                    <div key={option.value}>
                        <RadioGroupItem className="peer sr-only" id={option.value} value={option.value} />
                        <Label htmlFor={option.value} className={radioStyle} >
                            {option.label}
                        </Label>
                    </div>
                ))}
            </div>
        </RadioGroup>
    )
}