"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Package, User } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface User {
  name: string;
  email: string;
  token: string;
  displayname: string;
}

interface NavUserProps {
  user: User;
}

const UserDropdown = ({
  user,
  onLogout,
}: {
  user: NavUserProps;
  onLogout: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="hidden md:flex w-full md:w-1/2 md:justify-end">
      {user && user?.token ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-4 py-2 text-sm font-medium">
              <User className="w-4 h-4 mr-1" />
              {user?.name || "My Account"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push(routes.account)}>
              <Package className="w-4 h-4 mr-1" />
              My Orders
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onLogout();
                toast.success("Logged out successfully");
              }}
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" className="text-xs font-medium">
          Sign up / Sign in
        </Link>
      )}
    </div>
  );
};

export default UserDropdown;
