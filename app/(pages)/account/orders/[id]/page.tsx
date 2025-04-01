"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import {
  useGetOrderByIdQuery,
  useLazyFetchInvoiceQuery,
} from "@/redux/services/admin/orders";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orderSchema = z.object({
  status: z.number().min(0).max(1),
});

const UpdateOrderPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: orderData, isLoading: isLoadingOrder } = useGetOrderByIdQuery(
    id as string
  );

  const [
    fetchInvoice,
    { data: invoiceData, isLoading: isLoadingInvoice, error: invoiceError },
  ] = useLazyFetchInvoiceQuery();

  useEffect(() => {
    if (orderData?.order) {
      const order = orderData.order;
      let statusValue = 0;

      if (order.status !== undefined && order.status !== null) {
        statusValue =
          typeof order.status === "string"
            ? parseInt(order.status, 10)
            : order.status;
      }
    }
  }, [orderData]);

  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await fetchInvoice(id as string);

    const url =
      invoiceData?.url ||
      (typeof invoiceData === "string" ? invoiceData : null) ||
      invoiceData?.invoice_url ||
      invoiceData?.download_url;

    if (!url) {
      toast.error("Invoice URL not found in response");
      console.error("Invoice data structure:", invoiceData);
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `invoice_${orderData?.order?.code || "unknown"}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Invoice download started");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download invoice");
    }
  };

  if (isLoadingOrder || !orderData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const renderOrderDetails = (item) => {
    const productTitle = item.products_info?.[0]?.titre || "Unknown Product";
    const quantity = item.qte || "N/A";
    const priceUnit = item.price_unit ? `${item.price_unit.toFixed(2)}` : "N/A";
    const subtotal = item.price_unit
      ? `${(item.price_unit * item.qte).toFixed(2)}`
      : "N/A";

    return (
      <TableRow key={item.id}>
        <TableCell>{productTitle}</TableCell>
        <TableCell>{quantity}</TableCell>
        <TableCell>{priceUnit}</TableCell>
        <TableCell>{subtotal}</TableCell>
      </TableRow>
    );
  };

  const renderStatusBadge = (status: number) => {
    switch (status) {
      case "0":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            Processing
          </span>
        );
      case "1":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Delivered
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
      <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
        <CardHeader className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex flex-row space-x-2 items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-primary">
                Order: # {orderData?.order?.code}
              </CardTitle>
            </div>
            <Button onClick={handleDownload} disabled={isLoadingInvoice}>
              {isLoadingInvoice ? "Generating..." : "Download Invoice"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Order Information : #{orderData?.order?.code}{" "}
              </h3>
              <div>
                <Label htmlFor="title">Date: {orderData?.order?.date}</Label>
              </div>

              <div className="flex items-center gap-x-4">
                <Label htmlFor="status" className="whitespace-nowrap">
                  Status :{" "}
                  {renderStatusBadge(orderData?.order?.status)}
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Client Information</h3>
              <div>
                <Label htmlFor="title">Name: {orderData?.bill?.name}</Label>
              </div>
              <div>
                <Label htmlFor="title">Phone: {orderData?.bill?.phone}</Label>
              </div>
              <div>
                <Label htmlFor="title">City: {orderData?.bill?.city}</Label>
              </div>
              <div>
                <Label htmlFor="title">
                  Address: {orderData?.bill?.address}
                </Label>
              </div>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-1 space-y-2 mt-4">
            <h3 className="text-lg font-semibold">Ordered Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData?.order?.details?.length > 0 ? (
                  orderData.order.details.map(renderOrderDetails)
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No items available</TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Subtotal: $
                    {orderData?.order?.total
                      ? orderData.order.total.toFixed(2)
                      : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Delivery cost: $
                    {orderData?.order?.delivery_mode
                      ? orderData.order.delivery_mode.toFixed(2)
                      : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Total: $
                    {orderData?.order?.delivery_mode && orderData?.order?.total
                      ? (
                          orderData.order.delivery_mode +
                          orderData?.order?.total
                        ).toFixed(2)
                      : "N/A"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="p-6 border-t">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(routes.account)}
            >
              Go back
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateOrderPage;
