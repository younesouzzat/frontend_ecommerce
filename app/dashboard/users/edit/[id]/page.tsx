"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Users, Copy, KeyRound, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter, useParams } from "next/navigation";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/services/admin/users";
import { routes } from "@/utils/routes";
import { MESSAGES } from "@/constants/messages";
import { MultiSelect } from "@/components/ui/multi-select";

type FormData = {
  name: string;
  email: string;
  password: string;
  status: boolean;
  roles: string[];
};

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().optional(),
  status: z.boolean().default(true),
  roles: z.array(z.string()).min(1, "Please select at least one role."),
});

const EditUserPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [password, setPassword] = useState<string>("");
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const [availableRoles, setAvailableRoles] = useState<
    { value: string; label: string }[]
  >([]);

  const { data: respData, isLoading: isLoadingUser } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const clearGeneratePassword = () => {
    setPassword("");
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = Array.from(
      crypto.getRandomValues(new Uint32Array(16)),
      (x) => charset[x % charset.length]
    ).join("");
    setPassword(newPassword);
    setValue("password", newPassword, { shouldValidate: true });
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    } else {
      toast.error("No password to copy!");
    }
  };
   
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      status: true,
      roles: roleNames || []
    },
  });

  useEffect(() => {
    if (!respData) return;
  
    const userRoles = respData?.roles?.map((role: { id: number; name: string }) => role.name);
  
    const allRoles = Object.keys(respData.all_roles || {}).map((name) => ({
      label: name,
      value: name,
    }));
  
    setRoleNames(userRoles);
    setAvailableRoles(allRoles);
  
    reset({
      name: respData.user?.name || "",
      email: respData.user?.email || "",
      status: !!respData.user?.status,
      password: "",
      roles: userRoles,
    });
  }, [respData, reset]);
  

  const status = watch("status");

  const onSubmit = async (data: FormData) => {
    try {
      const updatedRoles = data.roles.map((roleName) => ({
        id: respData?.all_roles[roleName],
        name: roleName,
      }));

      const response = await updateUser({
        id,
        name: data.name,
        email: data.email,
        status: data.status,
        password: data.password || undefined,
        roles: updatedRoles,
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        router.push(routes.adminUsers);
      }
    } catch (error) {
      toast.error(MESSAGES.FAILED.UPDATE_FAILED);
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
            <CardTitle className="text-primary">Update User</CardTitle>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <div className="grid gap-8 md:grid-cols-2">
              {isLoadingUser ? (
                <div className="flex items-center justify-center col-span-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter user's full name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
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
                          console.log(selected);
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

                  {/* Password */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="mt-2 space-y-3">
                        <div className="flex space-x-2">
                          <Input
                            type="text"
                            value={password}
                            placeholder="Generated password"
                            {...register("password")}
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            type="button"
                            onClick={copyToClipboard}
                            className="shrink-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            type="button"
                            onClick={clearGeneratePassword}
                            className="shrink-0"
                          >
                            <Eraser className="h-4 w-4" />
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

                    {/* Status */}
                    <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <Label htmlFor="status">Account Status</Label>
                      <div className="flex items-center gap-2">
                        <span className={!status ? "text-primary" : ""}>
                          Inactive
                        </span>
                        <Switch
                          id="status"
                          checked={status}
                          onCheckedChange={(checked) =>
                            setValue("status", checked, {
                              shouldValidate: true,
                            })
                          }
                        />
                        <span className={status ? "text-primary" : ""}>
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
                onClick={() => router.push(routes.adminUsers)}
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

export default EditUserPage;
