"use client"

import * as React from "react"
import {
  Users,
  Package,
  ShoppingCart,
  GalleryVerticalEnd,
  ChartColumnStacked,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AuthContext } from "@/redux/stores/AuthProvider"
import { routes } from "../utils/routes";
import { User, AuthContextType } from "@/types";

// This is sample data.
const data = {
  teams: [
    {
      name: process.env.NEXT_APP_NAME,
      logo: GalleryVerticalEnd,
      plan: "Management",
    }
  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: ShoppingCart,
      isActive: false,
      items: [
        {
          title: "Management",
          url: routes.adminProducts,
        }
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: ChartColumnStacked,
      isActive: false,
      items: [
        {
          title: "Management",
          url: routes.adminCategories,
        }
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: Package,
      isActive: false,
      items: [
        {
          title: "Management",
          url: routes.adminOrders,
        }
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Management",
          url: routes.adminUsers,
        },
        {
          title: "Roles and Permissions",
          url: routes.adminRoles,
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = React.useContext(AuthContext) as AuthContextType;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}