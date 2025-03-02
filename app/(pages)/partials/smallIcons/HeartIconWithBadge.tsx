import { Heart } from "lucide-react";

export default function HeartIconWithBadge() {
  return (
    <div className="relative inline-block">
      {/* Heart Icon */}
      <Heart className="size-7 text-gray-700" strokeWidth={1.5} />

      {/* Badge */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
        0
      </span>
    </div>
  );
}
