import { Skeleton } from "@/components/ui/skeleton";

export default function PromotionSkeleton() {
  return (
    <div>
      <Skeleton className="h-[125px] w-[125px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[125px]" />
        <Skeleton className="h-4 w-[125px]" />
      </div>
    </div>
  );
}
