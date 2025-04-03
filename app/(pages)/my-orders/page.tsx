"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useGetOrderByIdQuery } from "@/redux/services/client/orders";
import { useAuthContext } from "@/redux/stores/AuthProvider";
import { Button } from "@/components/ui/button";

// Add TypeScript interfaces
interface Order {
  id: string;
  code: string;
  status: number;
  total: number;
  date: string;
}

interface OrdersResponse {
  orders: Order[];
  current_page: number;
  last_page: number;
  [key: string]: any; // For any additional properties
}

export default function UserOrderPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Improved query with error handling
  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    isError,
    error,
  } = useGetOrderByIdQuery(
    { userId: user?.id?.toString() || "", page, perPage },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      skip: !user?.id, // Skip query if no user ID
    }
  );

  const orders = ordersData?.orders || [];
  const totalPages = ordersData?.last_page || 1;
  const currentPage = ordersData?.current_page || 1;

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      router.push(routes.login);
    }
  }, [user, router]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            Processing
          </span>
        );
      case 1:
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

  // Render error state
  if (isError) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
          <CardContent className="p-6">
            <div className="text-center text-red-500 py-8">
              <p>Failed to load orders. Please try again later.</p>
              {error && 'message' in error && (
                <p className="text-sm mt-2">Error: {error.message}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
        <CardHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary text-2xl font-semibold">
              My Orders
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {isLoadingOrders ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <span className="sr-only">Loading orders...</span>
            </div>
          ) : orders.length > 0 ? (
            <>
              <h3 className="text-lg font-semibold mb-4">Orders List</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((item: Order) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{renderStatusBadge(item.status)}</TableCell>
                        <TableCell>$ {item.total.toFixed(2)}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Button
                            aria-label={`View order ${item.code}`}
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(routes.agentOrder(item.id))
                            }
                            variant={"ghost"}
                            size={"icon"}
                          >
                            <Eye />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between px-2 mt-4">
                <div className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>You have no orders yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}