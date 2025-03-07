import { ShoppingBasket } from "lucide-react";

interface CounterProps {
  count: number;
}

export default function BasketIconWithBadge({ count }: CounterProps) {
  return (
    <div className="relative inline-block">
      {/* Basket Icon */}
      <ShoppingBasket className="h-7 w-7 text-gray-700" strokeWidth={1.5} />

      {/* Badge */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
        {count}
      </span>
    </div>
  );
}
