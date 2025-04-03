"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Loader2, Users, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useCreateUserMutation, useGetRolesQuery } from "@/redux/services/admin/users";
import { Switch } from "@/components/ui/switch";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";
import { MultiSelect } from "@/components/ui/multi-select";

type FormData = {
  name: string;
  email: string;
  status: boolean;
  password: string;
  roles: string[];
};

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  status: z.boolean().default(true),
  roles: z.array(z.string()).min(1, "Please select at least one role."),
});

const CreateUserPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const [availableRoles, setAvailableRoles] = useState<
    { value: string; label: string }[]
  >([]);

  const { data: respData } = useGetRolesQuery(undefined);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const generatePassword = () => {
    const length = 16;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setValue("password", newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: true,
    },
  });

  const status = watch("status");

  useEffect(() => {
    if (!respData) return;

    const allRoles = Object.keys(respData.all_roles || {}).map((name) => ({
      label: name,
      value: name,
    }));

    setAvailableRoles(allRoles);
  }, [respData]);

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    const loadingToast = toast.loading(MESSAGES.OPERATION.CREATE);
    try {
      const createdRoles = data.roles.map((roleName: any) => ({
        id: respData?.all_roles[roleName],
        name: roleName,
      }));

      const response = await createUser({
        name: data.name,
        email: data.email,
        status: data.status,
        password: data.password,
        roles: createdRoles,
      }).unwrap();

      toast.dismiss(loadingToast);
      if (response.success) {
        toast.success(response.message);
        router.push(routes.adminUsers);
      }
    } catch (error: any) {
      console.error(error);
      toast.dismiss(loadingToast);
      if (error?.status === 422 && error?.data?.errors) {
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
              <Users className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-primary">Create User</CardTitle>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
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

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    className="mt-1.5"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <Label htmlFor="roles">Roles</Label>
                  <MultiSelect
                    options={availableRoles}
                    defaultValue={roleNames}
                    placeholder="Select roles"
                    maxCount={3}
                    onValueChange={(selected) => {
                      setValue("roles", selected, { shouldValidate: true });
                      setRoleNames(selected);
                    }}
                  />

                  {errors.roles && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.roles.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="mt-1.5 space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        value={password}
                        placeholder="Generated password will appear here"
                        className="font-mono"
                        readOnly
                        {...register("password", {
                          value: password,
                        })}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        type="button"
                        onClick={copyToClipboard}
                        className="shrink-0"
                        title="Copy password"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      type="button"
                      onClick={generatePassword}
                      variant="secondary"
                      className="w-full"
                    >
                      <KeyRound className="w-4 h-4 mr-2" />
                      Generate Secure Password
                    </Button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <Label htmlFor="status" className="font-medium">
                    Account Status
                  </Label>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        !status ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      Inactive
                    </span>
                    <Switch
                      id="status"
                      checked={status}
                      onCheckedChange={(checked) => setValue("status", checked)}
                    />
                    <span
                      className={`text-sm ${
                        status ? "text-primary" : "text-muted-foreground"
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
                onClick={() => router.push(routes.adminUsers)}
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

export default CreateUserPage;
