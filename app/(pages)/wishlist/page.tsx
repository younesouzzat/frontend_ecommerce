"use client";

import { Button } from "@/components/ui/button";
import { Frown, ShoppingCart, Trash } from "lucide-react";
import { RootState } from "@/redux/stores/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromWishlist,
} from "@/redux/services/shop/globalSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCartSheet } from "@/app/context/CartSheetContext";
import { Product } from "@/types";

const HEADERS = ["Product", "Title", "Price", "Actions"];

export default function ShopPage() {
  const dispatch = useDispatch();
  const { openSheet } = useCartSheet();
  const { wishlist } = useSelector((state: RootState) => state.global);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product }));
    toast.success("Product added to cart!");
    openSheet("cart");
  };

  const handleRemoveFromWishlist = (product: Product) => {
    dispatch(removeFromWishlist(product));
    toast.success("Removed from your wishlist");
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <h1 className="text-3xl font-medium mb-8 text-center">Wishlist</h1>
      {wishlist?.length > 0 ? (
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                {HEADERS.map((header, id) => (
                  <TableHead key={id} className="text-center">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {wishlist.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="flex justify-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="text-center">{product.title}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-3 my-2">
                      {product.is_promotion ? (
                        <>
                          <span className="text-2xl font-bold text-secondarybackground">
                            ${product.price_special}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-secondarybackground">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-3 my-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        size="icon"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                      <Button
                        onClick={() => handleRemoveFromWishlist(product)}
                        variant="destructive"
                        size="icon"
                      >
                        <Trash className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <Frown className="w-12 h-12 text-gray-500" />
          <p className="mt-2 text-lg font-semibold text-gray-600">
            No products found.
          </p>
        </div>
      )}
    </div>
  );
}
