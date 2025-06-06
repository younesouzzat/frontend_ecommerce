import { SignupForm } from "@/components/signup-form";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium dark:text-white"
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Link>
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
}
