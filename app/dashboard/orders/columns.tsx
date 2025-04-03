"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MESSAGES } from "@/constants/messages";
import { useDeleteOrderMutation } from "@/redux/services/admin/orders";
import { routes } from "@/utils/routes";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type Order = {
  id: string;
  cover: string;
  name: string;
  category: string;
  statut: string;
};

export const columns = (refetch: () => void): ColumnDef<Order>[] => [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("code")}</div>;
    },
  },
  {
    accessorKey: "payment_mode",
    header: "Payment Mode",
    cell: ({ row }) => (
      <Badge
        className="capitalize"
        variant={
          row.getValue("payment_mode") === "On Site" ? "secondary" : "success"
        }
      >
        {row.getValue("payment_mode")}
      </Badge>
    ),
  },
  {
    accessorKey: "delivery_mode",
    header: "Delivery coast",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("delivery_mode")} $</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className="capitalize"
        variant={row.getValue("status") == 1 ? "success" : "destructive"}
      >
        {row.getValue("status") == 1 ? "Delivered" : "In Progress"}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      const router = useRouter();
      const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

      const handleDelete = async (id: string, rowIndex: number) => {
        const loadingToast = toast.loading(MESSAGES.OPERATION.DELETE);
        try {
          const response = await deleteOrder({ id }).unwrap();
          toast.dismiss(loadingToast);

          if (response.success) {
            toast.success(response.message);
            refetch();
          }
        } catch (error: any) {
          console.error(error);
          toast.dismiss(loadingToast);
          if (error?.is_active === 422 && error?.data?.errors) {
            Object.keys(error.data.errors).forEach((key) => {
              toast.error(`${error.data.errors[key].join(", ")}`);
            });
          } else {
            toast.error(error?.data?.message || MESSAGES.FAILED.DELETE_FAILED);
          }
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{MESSAGES.COLULMN.ACTIONS}</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(routes.adminUpdateOrder(order.id))}
            >
              {MESSAGES.BUTTONS.EDIT}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="w-full cursor-pointer">
                    {MESSAGES.BUTTONS.DELETE}
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="dark:text-white">
                      {MESSAGES.CONFIRM.TITLE}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {MESSAGES.CONFIRM.CONTENT}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="dark:text-white">
                      {MESSAGES.BUTTONS.CANCEL}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(order.id, row.index)}
                      disabled={isLoading}
                    >
                      {isLoading
                        ? MESSAGES.OPERATION.DELETE
                        : MESSAGES.BUTTONS.CONFIRM}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
