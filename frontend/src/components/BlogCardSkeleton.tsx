import { Skeleton } from "./ui/skeleton";

export default function BlogCardSkeleton() {
    return (
        <div className="flex flex-col relative w-[23rem] h-[25rem] shadow-md rounded-md hover:scale-105 transition-all ease-in-out duration-500">
            <div className="w-full h-1/2 relative">
                <Skeleton className="w-full h-full bg-zinc-200 rounded-b-none" />
            </div>
            <div className="w-full h-max p-2">
                <div className="flex gap-2">
                    <Skeleton className="w-28 h-10 bg-zinc-200" />
                    <Skeleton className="w-28 h-10 bg-zinc-200" />
                </div>

                <div className="text-left mt-4">
                    <Skeleton className="w-28 h-6 bg-zinc-200" />
                </div>
            </div>
            <footer className="absolute bottom-1 left-0 w-full flex p-2 items-center justify-between">
                <Skeleton className="w-32 h-6 bg-zinc-200" />
                <Skeleton className="w-24 h-6 bg-zinc-200" />
            </footer>
        </div>
    );
}
