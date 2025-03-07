import { Skeleton } from "@/components/ui/skeleton";

export default function FirstSkeleton({ index }) {
  return (
    <div
      key={index}
      className="w-full md:w-1/6 flex flex-col justify-center items-center space-y-2"
    >
      <Skeleton className="h-[125px] w-[125px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[125px]" />
        <Skeleton className="h-4 w-[125px]" />
      </div>
    </div>
  );
}
