"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/stores/store";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BasketIconWithBadge from "@/app/(pages)/partials/smallIcons/BasketIconWithBadge";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from "@/redux/services/shop/globalSlice";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartSheet } from "@/app/context/CartSheetContext";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";

export default function ShopCartSheet() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems } = useSelector((state: RootState) => state.global);
  const { isSheetOpen, closeSheet, openSheet } = useCartSheet();

  const count = cartItems.length ?? 0;

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1 || isNaN(quantity)) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearItems = () => {
    dispatch(clearCart());
  };
  
  const handleCheckout = () => {
    router.push(routes.checkout);
    closeSheet("cart");
  };

  const handleIncrement = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  return (
    <div>
      <Sheet
        open={isSheetOpen("cart")}
        onOpenChange={() => {
          isSheetOpen("cart") ? closeSheet("cart") : openSheet("cart");
        }}
      >
        <SheetTrigger>
          <BasketIconWithBadge count={count} />
        </SheetTrigger>

        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              Review your items before checkout.
            </SheetDescription>
          </SheetHeader>

          {/* Display Cart Items */}
          {cartItems.length > 0 ? (
            <ScrollArea className="max-h-[400px] overflow-y-auto space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                          {item.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-black dark:text-white">
                          {item.quantity} X $
                          {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleDecrement(item.id, item.quantity)
                          }
                          className="w-8 h-8 p-0 text-xl"
                        >
                          -
                        </Button>
                        <span className="w-8 h-8 p-0 flex justify-center items-center bg-slate-200 rounded-md text-blue-700 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleIncrement(item.id, item.quantity)
                          }
                          className="w-8 h-8 p-0 text-xl"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4"
                    aria-title={`Remove ${item.title} from cart`}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Your cart is empty.
            </p>
          )}

          {/* Cart Totals */}
          {cartItems.length > 0 && (
            <div className="space-y-4 mt-6">
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="text-gray-600 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold text-lg">Total</span>
                <span className="text-gray-600 dark:text-white text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6 flex justify-between gap-4">
              <Button
                onClick={handleClearItems}
                variant="outline"
                className="w-1/2"
              >
                Clear Cart
              </Button>
                <Button
                  asChild
                  onClick={handleCheckout}
                  className="w-full md:w-1/2 flex cursor-pointer items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
