import { cn } from "@/lib/utils";

export default function Input({ type, placeholder, ref, className, onChange, onEnter }: {
    type?: string,
    placeholder?: string,
    ref?: React.LegacyRef<HTMLInputElement>,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEnter?: () => void;
}) {
    return (
        <input
            ref={ref}
            type={type ?? "text"}
            placeholder={placeholder}
            className={cn(
                "w-full p-4 rounded-md bg-zinc-100 border border-zinc-200 focus:border-zinc-300 focus:outline-none",
                className && className
            )}
            onChange={e => onChange?.(e)}
            onKeyDown={(key) => {
                if (key.code === "Enter") {
                    onEnter?.();
                }
            }}
        />
    )
}