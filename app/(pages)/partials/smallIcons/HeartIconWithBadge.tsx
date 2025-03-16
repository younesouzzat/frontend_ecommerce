import { RootState } from "@/redux/stores/store";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";

export default function HeartIconWithBadge() {
  const { wishlist } = useSelector((state: RootState) => state.global);
  const count = wishlist.length ?? 0;

  return (
    <div className="relative inline-block">
      {/* Heart Icon */}
      <Heart className="size-7 text-gray-700" strokeWidth={1.5} />

      {/* Badge */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
        {count}
      </span>
    </div>
  );
}
