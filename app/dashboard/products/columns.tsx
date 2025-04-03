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
import { useDeleteProductMutation } from "@/redux/services/admin/products";
import { routes } from "@/utils/routes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type Product = {
  id: string;
  cover: string;
  name: string;
  category: string;
  statut: string;
};

export const columns = (refetch: () => void): ColumnDef<Product>[] => [
  {
    accessorKey: "image",
    header: "Cover",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <Avatar>
            <AvatarImage src={row.getValue("image")} alt="cover" />
          </Avatar>
        </div>
      );
    },
  },  
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "statut",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className="capitalize"
        variant={row.getValue("statut") ? "success" : "destructive"}
      >
        {row.getValue("statut") ? "active" : "inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const router = useRouter();
      const [deleteProduct, { isLoading }] = useDeleteProductMutation();

      const handleDelete = async (id: string, rowIndex: number) => {
        const loadingToast = toast.loading(MESSAGES.OPERATION.DELETE);
        try {
          const response = await deleteProduct({ id }).unwrap();
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
              onClick={() => router.push(routes.adminUpdateProduct(product.id))}
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
                      onClick={() => handleDelete(product.id, row.index)}
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
