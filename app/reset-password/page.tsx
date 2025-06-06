import { ResetPWDForm } from "@/components/reset-password-form";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium dark:text-white">
          { process.env.NEXT_PUBLIC_APP_NAME || 'Your App Name' }
        </Link>
        <ResetPWDForm />
      </div>
    </div>
  );
}
