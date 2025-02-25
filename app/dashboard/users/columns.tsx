"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useDeleteUserMutation } from "@/redux/services/admin/users";
import { routes } from "@/utils/routes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type User = {
  id: string;
  name: string;
  roles: string[];
  status: "active" | "inactive" | "banned";
  email: string;
};

export const columns = (refetch: () => void): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className="capitalize"
        variant={row.getValue("status") ? "success" : "destructive"}
      >
        {row.getValue("status") ? "active" : "inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "roles_name",
    header: "Roles",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {row.original.roles.map((role: { name: string }) => (
          <Badge key={role.name}>
            {role.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();
      const [deleteUser, { isLoading }] = useDeleteUserMutation();

      const handleDelete = async (id: string, rowIndex: number) => {
        const loadingToast = toast.loading(MESSAGES.OPERATION.DELETE);
        try {
          const response = await deleteUser({ id }).unwrap();
          toast.dismiss(loadingToast);

          if (response.success) {
            toast.success(response.message);
            refetch();
          }
        } catch (error: any) {
          console.error(error);
          toast.dismiss(loadingToast);
          if (error?.status === 422 && error?.data?.errors) {
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
              onClick={() => router.push(routes.adminUpdateUser(user.id))}
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
                      onClick={() => handleDelete(user.id, row.index)}
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
