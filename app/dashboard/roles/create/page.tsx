"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useCreateRoleMutation } from "@/redux/services/admin/roles";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";

type FormData = {
  name: string;
};

const loginSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const CreateRolePage = () => {
  const router = useRouter();
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const loadingToast = toast.loading(MESSAGES.OPERATION.CREATE);
    try {
      const response = await createRole({
        name: data.name,
      }).unwrap();

      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success(response.message);
        router.push(routes.adminRoles);
      }
    } catch (error: any) {
      console.error(error);
      toast.dismiss(loadingToast);
      if (error?.status === 422 && error?.data?.errors) {
        Object.keys(error.data.errors).forEach((key) => {
          toast.error(`${error.data.errors[key].join(", ")}`);
        });
      } else {
        toast.error(
          error?.data?.message || MESSAGES.FAILED.CREATE_FAILED
        );
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
      <Card className="rounded-xl border bg-card text-card-foreground shadow-lg">
        <CardHeader className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-primary">Create Role</CardTitle>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Role Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter role's name"
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
            </div>
          </CardContent>

          <CardFooter className="p-6 border-t">
            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading} className="px-8">
                {isLoading ? (
                  <>
                    { MESSAGES.OPERATION.CREATE }
                  </>
                ) : (
                  "Create Role"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(routes.adminRoles)}
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

export default CreateRolePage;
