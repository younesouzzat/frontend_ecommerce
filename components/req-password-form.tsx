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
import { useRequestpwdMutation } from "@/redux/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const reqSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((email) => email.toLowerCase().trim()),
});

type FormData = z.infer<typeof reqSchema>;

export function RequestPWDForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [requestpwd, { isLoading }] = useRequestpwdMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(reqSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    const loadingToast = toast.loading("Sending reset link...");

    try {
      const response = await requestpwd({
        email: data.email,
      }).unwrap();

      if(response.success) {
        toast.dismiss(loadingToast);
        toast.success("Reset link sent! Check your email.");
  
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Password reset request failed:", error);

      toast.dismiss(loadingToast);
      toast.error(
        error?.data?.message || "Failed to send reset link. Please try again."
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Request New Password</CardTitle>
          <CardDescription>
            Please enter your email to receive password reset instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                    className={cn(
                      errors.email && "border-red-500 focus:ring-red-500"
                    )}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
