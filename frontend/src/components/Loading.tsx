import { CircleDashed } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
      <CircleDashed className="animate-spin-slow w-10 h-10" />
    </div>
  );
}
