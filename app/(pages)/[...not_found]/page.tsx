import { routes } from "@/utils/routes";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <section className="container flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-4">
        The page you are looking for does not exist.
      </p>
      <Link
        href={routes.home}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go Home
      </Link>
    </section>
  );
}
