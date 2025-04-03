"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ChartColumnStacked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/redux/services/admin/categories";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { useState } from "react";
import { MESSAGES } from "@/constants/messages";

export const dynamic = 'force-dynamic';

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const perPage = 5;

  const { data, isLoading, isError, refetch } = useGetCategoriesQuery(
    { page: Number(page), perPage: Number(perPage) },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const categories = data?.categories || [];
  const totalPages = data?.last_page || 1;
  const currentPage = data?.current_page || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="rounded-xl border bg-card text-card-foreground shadow">
        <CardHeader className="p-6 flex flex-col space-y-2 md:flex-row md:space-x-2 items-center justify-between">
          <div className="flex flex-row space-x-2 items-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ChartColumnStacked className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-primary">
              Categorie Management
            </CardTitle>
          </div>
          <div>
            <Link href={routes.adminCreateCategorie}>
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
            <div className="text-center text-red-500">
              {MESSAGES.ERROR.LOAD_DATA}
            </div>
          ) : categories && categories.length > 0 ? (
            <DataTable 
              columns={columns(refetch)} 
              data={categories}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : (
            <div className="text-center text-gray-500">
              {MESSAGES.ERROR.NO_DATA_FOUND}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}