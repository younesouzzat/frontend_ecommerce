"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  Form,
} from "@/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/stores/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "@/redux/services/client/orders";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/services/shop/globalSlice";

interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  note: string;
  payment_option: string;
  delivery_option: string;
}

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cities = ["Casablanca", "Rabat", "Agadir", "Marrakech", "Other city"];
  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();

  const { cartItems } = useSelector((state: RootState) => state.global);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const taxRate = 0.1;
  const tax = subtotal * taxRate;

  const total = subtotal + tax;

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      note: "",
      payment_option: "on site",
      delivery_option: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    const orderPayload = {
      customerInfo: formData,
      orderItems: cartItems,
      orderSummary: {
        subtotal,
        tax,
        total,
        deliveryFee: formData.delivery_option
          ? Number(formData.delivery_option)
          : 0,
      },
    };
    createOrder(orderPayload);
  };
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      router.push(routes.orderComplete);
    }
    if (isError) {
      toast.error("Failed to place order. Please try again later.");
    }
  }, [isSuccess, isError]);
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Checkout
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+\s()-]{8,15}$/,
                          message: "Please enter a valid phone number",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: "Address is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      rules={{ required: "City is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Controller
                              name="city"
                              control={form.control}
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose your city" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {cities.map((city) => (
                                      <SelectItem key={city} value={city}>
                                        {city}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Note</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any special instructions for your order"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="payment_option"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="on site" id="on-site" />
                              <Label htmlFor="on-site">
                                Payment on delivery
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Delivery Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="delivery_option"
                    rules={{ required: "Please select a delivery method" }}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="0" id="self-pickup" />
                              <Label htmlFor="self-pickup">
                                Self pickup - 0.00 MAD
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="20" id="casablanca" />
                              <Label htmlFor="casablanca">
                                Casablanca - from 20.00 MAD
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="30" id="other-city" />
                              <Label htmlFor="other-city">
                                Other city - from 30.00 MAD
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Your order</CardTitle>
                </CardHeader>
                <CardContent>
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
                            </div>
                          </div>
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
                        <span className="text-gray-600">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Tax (10%)</span>
                        <span className="text-gray-600">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="font-semibold text-lg">Total</span>
                        <span className="text-gray-600 text-lg">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    className="w-full py-6 text-lg"
                    disabled={isLoading || cartItems.length === 0}
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
