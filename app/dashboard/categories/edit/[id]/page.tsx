"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ChartColumnStacked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter, useParams } from "next/navigation";
import {
  useGetCategorieByIdQuery,
  useUpdateCategorieMutation,
} from "@/redux/services/admin/categories";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";

type FormData = {
  name: string;
  is_active: boolean;
};

const categorieSchema = z.object({
  name: z.string().min(1, "Name is required"),
  is_active: z.boolean().default(true),
});

const EditCategoriePage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: respData, isLoading: isLoadingCategorie } =
    useGetCategorieByIdQuery(id);
  const [updateCategorie, { isLoading }] = useUpdateCategorieMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(categorieSchema),
    defaultValues: {
      name: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (!respData) return;
    reset({
      name: respData.categorie?.name || "",
      is_active: !!respData.categorie?.is_active,
    });
  }, [respData, reset]);

  const is_active = watch("is_active");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await updateCategorie({
        id,
        name: data.name,
        is_active: data.is_active,
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        router.push(routes.adminCategories);
      }
    } catch (error: any) {
      console.error("Update Category Error:", error);
  
      const errorMessage = error?.data?.errors?.name?.[0] || MESSAGES.FAILED.UPDATE_FAILED;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
      <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
        <CardHeader className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ChartColumnStacked className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-primary">
              Update Categorie
            </CardTitle>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              {isLoadingCategorie ? (
                <div className="flex items-center justify-center col-span-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter categorie's full name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Is_active */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <Label htmlFor="is_active">Status</Label>
                      <div className="flex items-center gap-2">
                        <span className={!is_active ? "text-primary" : ""}>
                          Inactive
                        </span>
                        <Switch
                          id="is_active"
                          checked={is_active}
                          onCheckedChange={(checked) =>
                            setValue("is_active", checked, {
                              shouldValidate: true,
                            })
                          }
                        />
                        <span className={is_active ? "text-primary" : ""}>
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>

          {/* Actions */}
          <CardFooter className="p-6 border-t">
            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading} className="px-8">
                {isLoading
                  ? MESSAGES.OPERATION.UPDATE
                  : MESSAGES.BUTTONS.UPDATE}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(routes.adminCategories)}
              >
                {MESSAGES.BUTTONS.CANCEL}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditCategoriePage;
