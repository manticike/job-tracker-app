"use client"

import * as React from "react";
import {
  Briefcase,
  PlusCircle,
  List,
  PieChart,
  Settings2,
  User,
  LogOut,
} from "lucide-react"

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Isaac Antwi",
    email: "isaac@example.com",
    avatar: "/avatars/default.jpg",
  },
  NavMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Briefcase,
      isActive: true,
    },
    {
      title: "Add Job",
      url: "/add-job",
      icon: PlusCircle,
    },
    {
      title: "Applications",
      url: "/applications",
      icon: List,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: PieChart,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Account",
          url: "/settings/account",
        },
      ],
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOut,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="text-xl font-bold px-4 py-2">Job Tracker</div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.NavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}