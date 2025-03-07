import { Skeleton } from "@/components/ui/skeleton";

export default function ImageProdSkeleton({ index }) {
  return (
    <div
      key={index}
      className="flex aspect-square items-center justify-center p-6"
    >
      <Skeleton className="h-[125px] w-[125px] rounded-xl" />
    </div>
  );
}
