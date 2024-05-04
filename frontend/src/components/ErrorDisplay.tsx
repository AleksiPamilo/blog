import { Button } from "./ui/button";

export default function ErrorDisplay({ error, onRetry }: {
    error: string;
    onRetry?: () => void;
}) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h1 className="font-semibold">Error:</h1>
            <p className="mb-2">{error}</p>
            <Button onClick={() => onRetry?.()}>Retry</Button>
        </div>
    )
}