"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlist,
  toggleCompare,
  addToCart,
} from "@/redux/services/shop/globalSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useGetProductByIdQuery } from "@/redux/services/client/products";
import { useParams } from "next/navigation";
import { useCartSheet } from "@/app/context/CartSheetContext";
import toast from "react-hot-toast";
import { BarChart2, Heart, Share2, ShoppingCart, Star } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const { openSheet } = useCartSheet();
  const { wishlist, compareList, cartItems } = useSelector(
    (state) => state.global
  );

  const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleWishlist = (productId) => {
    dispatch(toggleWishlist(productId));
    const isAdding = !wishlist.includes(productId);
    toast.success(
      isAdding
        ? "Added to your wishlist"
        : "Removed from your wishlist"
    );
  };

  const handleCompare = (product) => {
    dispatch(toggleCompare(product));
    const isAdding = !compareList.some(item => item.id === product.id);
    toast.success(
      isAdding
        ? "Added to comparison list"
        : "Removed from comparison list"
    );
  };

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        ...product,
        quantity: quantity
      };
      dispatch(addToCart(itemToAdd));
      toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
      openSheet("cart");
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Calculate if product is in stock
  // const inStock = product?.stock > 0;
  const inStock = true;
  const isWishlisted = wishlist.includes(product?.id);
  const isInCompare = compareList.some(item => item.id === product?.id);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-64">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
          <div className="h-64 w-full max-w-md bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 mx-auto"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Error loading product</h2>
        <p className="text-gray-600">We couldn't load the product information. Please try again later.</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8 p-4">
        {/* Product Image Gallery */}
        <div className="w-full md:w-1/2">
          <div 
            className={`relative w-full overflow-hidden cursor-zoom-in rounded-lg ${isZoomed ? 'h-96' : 'h-auto'}`}
            onClick={toggleZoom}
          >
            <Image
              src={product?.images[activeIndex]}
              alt={`${product?.titre} - Image ${activeIndex + 1}`}
              width={800}
              height={800}
              priority
              className={`rounded-lg object-cover transition-all duration-300 ${
                isZoomed ? 'scale-150 hover:scale-150' : 'hover:scale-110'
              }`}
            />
          </div>

          {/* Thumbnails Navigation */}
          <div className="flex flex-wrap gap-2 mt-4 justify-start">
            {product?.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`border-2 p-1 rounded-lg transition-all ${
                  activeIndex === index
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Product Title and Badges */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {inStock ? (
                <Badge className="bg-green-500">In Stock</Badge>
              ) : (
                <Badge className="bg-red-500">Out of Stock</Badge>
              )}
              {product?.isNew && <Badge className="bg-blue-500">New</Badge>}
              {product?.discount > 0 && (
                <Badge className="bg-orange-500">Sale {product.discount}% Off</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product?.titre}</h1>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 my-2">
            <span className="text-2xl font-bold">${product?.prix}</span>
            {product?.oldPrice && (
              <span className="text-lg text-gray-500 line-through">${product.oldPrice}</span>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-2 my-2">
            <p className="text-sm text-gray-600">SKU: <span className="font-medium">{product?.ref}</span></p>
            <p className="text-sm text-gray-600">Weight: <span className="font-medium">{product?.size} kg</span></p>
            <p className="text-sm text-gray-600">
              Dimensions: <span className="font-medium">
                {product?.dimensions?.length} × {product?.dimensions?.width} × {product?.dimensions?.height} cm
              </span>
            </p>
            {product?.category && (
              <p className="text-sm text-gray-600">Category: <span className="font-medium">{product?.category}</span></p>
            )}
          </div>

          {/* Description */}
          <div className="my-4">
            <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: product?.description }} />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 my-2">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={handleDecrement}
                className="h-10 w-10 rounded-r-none"
                aria-label="Decrease quantity"
                disabled={!inStock}
              >
                -
              </Button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="h-10 w-14 border-y border-gray-300 text-center focus:outline-none"
                disabled={!inStock}
              />
              <Button
                variant="outline"
                onClick={handleIncrement}
                className="h-10 w-10 rounded-l-none"
                aria-label="Increase quantity"
                disabled={!inStock}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart(product)} 
            className="w-full h-12 mt-2 text-lg"
            disabled={!inStock}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          {/* Wishlist and Compare Buttons */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={isWishlisted ? "default" : "outline"}
              className={`flex-1 ${isWishlisted ? "bg-red-50 text-red-500 hover:bg-red-100" : ""}`}
              onClick={() => handleWishlist(product?.id)}
            >
              <Heart
                size={18}
                className="mr-2"
                fill={isWishlisted ? "currentColor" : "none"}
              />
              {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
            </Button>
            <Button
              variant={isInCompare ? "default" : "outline"}
              className={`flex-1 ${isInCompare ? "bg-blue-50 text-blue-500 hover:bg-blue-100" : ""}`}
              onClick={() => handleCompare(product)}
            >
              <BarChart2 size={18} className="mr-2" />
              {isInCompare ? "In Compare" : "Compare"}
            </Button>
          </div>

          {/* Share Button */}
          <Button variant="ghost" className="mt-2 self-start">
            <Share2 size={18} className="mr-2" />
            Share Product
          </Button>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full border-b justify-start mb-6">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews
              {product?.reviews?.length > 0 && ` (${product.reviews.length})`}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="p-4">
            <div dangerouslySetInnerHTML={{ __html: product?.fullDescription || product?.description }} />
          </TabsContent>
          
          <TabsContent value="specifications" className="p-4">
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(product?.specifications || {
                  "Weight": `${product?.size} kg`,
                  "Dimensions": `${product?.dimensions?.length} × ${product?.dimensions?.width} × ${product?.dimensions?.height} cm`,
                  "SKU": product?.ref,
                  "Material": product?.material || "Not specified"
                }).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <td className="py-3 px-4 font-medium">{key}</td>
                    <td className="py-3 px-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-4">
            {product?.reviews?.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">{review.user}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this product!</p>
                <Button>Write a Review</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {product?.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Related product cards would go here */}
          </div>
        </div>
      )}
    </div>
  );
}