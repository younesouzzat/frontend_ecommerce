"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useResetpwdMutation } from "@/redux/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { SearchParamsWrapper } from "./SearchParamsWrapper";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .min(1, "Password is required"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data: any) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type FormData = z.infer<typeof resetSchema>;

export function ResetPWDForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [resetpwd, { isLoading }] = useResetpwdMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetSchema),
    mode: "onBlur",
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <SearchParamsWrapper>
        {(searchParams) => {
          const token = searchParams.get("token") || undefined;
          const email = searchParams.get("email") || undefined;

          if (!token || !email) {
            return <div>Invalid or expired password reset link.</div>;
          }

          const onSubmit = async (data: FormData) => {
            const loadingToast = toast.loading("Reseting password...");

            try {
              const response = await resetpwd({
                token,
                email,
                password: data.password,
                confirm_password: data.confirm_password,
              }).unwrap();

              if (response.success) {
                toast.dismiss(loadingToast);
                toast.success("Password reset successfully!");

                setTimeout(() => {
                  router.push("/login");
                }, 2000);
              }
            } catch (error: any) {
              console.error("Password reset request failed:", error);

              toast.dismiss(loadingToast);
              toast.error(
                error?.data?.message ||
                  "Failed to reset password. Please try again."
              );
            }
          };

          return (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Reset Your Password</CardTitle>
                <CardDescription>
                  Please enter your new password and confirm it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                          id="password"
                          type="password"
                          {...register("password")}
                        />
                        {errors.password && (
                          <span className="text-red-500">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm_password">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirm_password"
                          type="password"
                          {...register("confirm_password")}
                        />
                        {errors.confirm_password && (
                          <span className="text-red-500">
                            {errors.confirm_password.message}
                          </span>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Submit"}
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Go back to login?{" "}
                      <Link
                        href="/login"
                        className="underline underline-offset-4"
                      >
                        Sign in
                      </Link>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          );
        }}
      </SearchParamsWrapper>
    </div>
  );
}
