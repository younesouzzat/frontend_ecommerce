"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useSignupMutation } from "@/redux/services/auth";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Socialite from "./Socialite";
import { routes } from "@/utils/routes";
import { useForm } from "react-hook-form";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
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

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signup, { isLoading }] =
    useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const loadingToast = toast.loading("Loading...");

    try {
      const response = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      }).unwrap();
      if (response.success) {
        toast.dismiss(loadingToast);
        toast.success("Welcome");
        if (response?.user?.token) {
          setCookie(
            "auth_data",
            JSON.stringify({
              token: response?.user?.token,
              role: Array.isArray(response?.user?.role)
                ? response?.user?.role
                : [response?.user?.role],
              username: response?.user?.name,
              useremail: response?.user?.email,
            }),
            {
              path: process.env.COOKIE_PATH || "/",
              maxAge: parseInt(process.env.COOKIE_MAX_AGE as any) || 604800,
              httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
              secure: process.env.COOKIE_SECURE === "true",
              sameSite: (process.env.COOKIE_SAME_SITE || "strict") as "strict" | "lax" | "none",
            }
          );
          window.location.href = routes.home;
        }
      }
    } catch (error: any) {
      console.error("Signup failed:", error);

      toast.dismiss(loadingToast);
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-balance text-muted-foreground">
              Sign up for a new account
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="order-1 md:order-0 space-y-4 p-6 md:p-8">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Socialite />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="order-0 md:order-1 p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Adam Smith"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
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
                <Label htmlFor="confirm_password">Confirm Password</Label>
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
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
