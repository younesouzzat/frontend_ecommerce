"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Role, columns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetRolesQuery } from "@/redux/services/admin/roles";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { MESSAGES } from "@/constants/messages";

export default function RolesPage() {
  const { data, isLoading, isError, refetch } = useGetRolesQuery<Role[]>({
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const roles = data?.roles || [];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="rounded-xl border bg-card text-card-foreground shadow">
        <CardHeader className="p-6 flex flex-col space-y-2 md:flex-row md:space-x-2 items-center justify-between">
          <div className="flex flex-row space-x-2 items-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-primary">Roles Management</CardTitle>
          </div>
          <div>
            <Link href={routes.adminCreateRole}>
              <Button variant="default">
                New <PlusCircle />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-lg bg-gray-200" />
          ) : isError ? (
            <div className="text-center text-red-500">{ MESSAGES.ERROR.LOAD_DATA }</div>
          ) : roles && roles.length > 0 ? (
            <DataTable columns={columns(refetch)} data={roles} />
          ) : (
            <div className="text-center text-gray-500">{MESSAGES.ERROR.NO_DATA_FOUND}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}