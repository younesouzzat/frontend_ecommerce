import { Skeleton } from "@/components/ui/skeleton";

interface ImageProdSkeletonProps {
  index: number;
}

export default function ImageProdSkeleton({ index }: ImageProdSkeletonProps) {
  return (
    <div className="w-full shadow-none cursor-pointer border-none hover:shadow-lg transition-shadow">
      <Skeleton className="relative flex flex-col items-center text-center group" />
    </div>
  );
}
