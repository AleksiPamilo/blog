import { Skeleton } from "./ui/skeleton";

export default function SkeletonCard() {
  return (
    <Skeleton className="flex flex-col gap-2 p-4 bg-zinc-100 rounded-md">
      <div className="flex w-full gap-2 items-center justify-between">
        <Skeleton className="h-4 w-1/2 bg-zinc-300" />
        <Skeleton className="h-4 w-1/3 bg-zinc-300" />
      </div>
      <Skeleton className="h-4 w-[200px] bg-zinc-300" />
    </Skeleton>
  );
}
