"use client";
import React, { useEffect, useState } from "react";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useCreateCategorieMutation } from "@/redux/services/admin/categories";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";

type FormData = {
  name: string;
  email: string;
  is_active: string;
  password: string;
  roles: string[];
};

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  is_active: z.boolean().default(true),
});

const CreateCategoriePage = () => {
  const router = useRouter();
  const [createCategorie, { isLoading }] = useCreateCategorieMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      is_active: true,
    },
  });

  const is_active = watch("is_active");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const loadingToast = toast.loading(MESSAGES.OPERATION.CREATE);
    try {

      const response = await createCategorie({
        name: data.name,
        is_active: data.is_active
      }).unwrap();

      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success(response.message);
        router.push(routes.adminCategories);
      }
    } catch (error: any) {
      console.error(error);
      toast.dismiss(loadingToast);
      if (error?.is_active === 422 && error?.data?.errors) {
        Object.keys(error.data.errors).forEach((key) => {
          toast.error(`${error.data.errors[key].join(", ")}`);
        });
      } else {
        toast.error(error?.data?.message || MESSAGES.FAILED.CREATE_FAILED);
      }
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
            <CardTitle className="text-primary">Create Categorie</CardTitle>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter user's full name"
                    className="mt-1.5"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <Label htmlFor="is_active" className="font-medium">
                    Status
                  </Label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        !is_active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      Inactive
                    </span>
                    <Switch
                      id="is_active"
                      checked={is_active}
                      onCheckedChange={(checked) => setValue("is_active", checked)}
                    />
                    <span
                      className={`text-sm ${
                        is_active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 border-t">
            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading} className="px-8">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    {MESSAGES.OPERATION.CREATE}
                  </>
                ) : (
                  <>{MESSAGES.BUTTONS.CREATE}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(routes.adminCategories)}
              >
                Cancel
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateCategoriePage;
