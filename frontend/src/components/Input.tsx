export default function Input({ type, placeholder, ref }: {
    type?: string,
    placeholder?: string,
    ref?: React.LegacyRef<HTMLInputElement>
}) {
    return (
        <input
            ref={ref}
            type={type ?? "text"}
            placeholder={placeholder}
            className="w-full p-4 rounded-md bg-zinc-100 border border-zinc-200 focus:border-zinc-300 focus:outline-none"
        />
    )
}