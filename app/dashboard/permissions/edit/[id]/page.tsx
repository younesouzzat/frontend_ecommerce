"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCreatePermissionMutation,
  useGetPermissionByIdQuery,
} from "@/redux/services/admin/permissions";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const rolePermissionSchema = z.object({
  permissions: z
    .array(z.number())
    .min(1, "At least one permission is required"),
});

const RolePermissionsPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: permission, isLoading } = useGetPermissionByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [assignPermissions, { isLoading: isAssigning }] =
    useCreatePermissionMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(rolePermissionSchema),
    defaultValues: {
      permissions: [],
    },
  });

  useEffect(() => {
    if (permission?.res_data?.role_permissions) {
      reset({ permissions: permission.res_data.role_permissions });
    }
  }, [permission, reset]);

  const onSubmit = async (data) => {
    const loadingToast = toast.loading(MESSAGES.OPERATION.CREATE);
    try {
      const response = await assignPermissions({
        role_id: id,
        permissions: data.permissions,
      }).unwrap();

      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success(response.message);
        router.push(routes.adminRoles);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error?.status === 422 && error?.data?.errors) {
        Object.keys(error.data.errors).forEach((key) => {
          toast.error(error.data.errors[key].join(", "));
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
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-primary capitalize">
              {permission?.res_data?.role?.name} Permissions
            </CardTitle>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              {isLoading ? (
                <div className="flex items-center justify-center col-span-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                permission?.res_data?.permissions?.map((group, index) => (
                  <div key={index} className="space-y-4">
                    <Label className="font-bold text-base">
                      {group.parent}
                    </Label>
                    <ul className="flex flex-col items-start space-y-3">
                      {group.permissions.map((perm) => (
                        <li
                          className="flex items-center space-x-2"
                          key={perm.id}
                        >
                          <Controller
                            name="permissions"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                id={`permission_${perm.id}`}
                                checked={field.value.includes(perm.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, perm.id]
                                    : field.value.filter((p) => p !== perm.id);
                                  field.onChange(newValue);
                                }}
                              />
                            )}
                          />
                          <Label
                            htmlFor={`permission_${perm.id}`}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {perm.name}
                          </Label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
            {errors.permissions && (
              <p className="text-red-500 text-sm mt-4">
                {errors.permissions.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="p-6 border-t">
            <div className="flex gap-3">
              <Button type="submit" disabled={isAssigning} className="px-8">
                {isAssigning ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    {MESSAGES.OPERATION.CREATE}
                  </>
                ) : (
                  "Assign Permissions"
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

export default RolePermissionsPage;
