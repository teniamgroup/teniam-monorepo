"use client"

import * as React from "react"
import {
  Command,
  LifeBuoy,
  Send,
  BookOpen,
  Monitor,
  Keyboard,
  Cpu,
  MonitorSmartphone,
  Headphones,
  Lightbulb,
  Usb,
} from "lucide-react"
import { HttpTypes } from "@medusajs/types"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navSecondary: [
    {
      title: "Blogs",
      url: "https://blogs.teniam.com",
      icon: BookOpen,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  categories?: HttpTypes.StoreProductCategory[]
  locale?: string
  regions?: HttpTypes.StoreRegion[]
}

const getCategoryIcon = (name: string) => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('desk') || lowerName.includes('setup')) return Monitor
  if (lowerName.includes('keyboard') || lowerName.includes('input')) return Keyboard
  if (lowerName.includes('pc') || lowerName.includes('component')) return Cpu
  if (lowerName.includes('monitor')) return MonitorSmartphone
  if (lowerName.includes('audio') || lowerName.includes('video')) return Headphones
  if (lowerName.includes('lighting') || lowerName.includes('ambience')) return Lightbulb
  if (lowerName.includes('accessories')) return Usb
  return Monitor // default
}

export function AppSidebar({ categories = [], locale = 'en', regions = [], ...props }: AppSidebarProps) {
  const navMain = React.useMemo(() => {
    return categories.map((category) => ({
      title: category.name,
      url: `/${locale}?category=${category.handle}`,
      icon: getCategoryIcon(category.name),
      isActive: false,
      items: (category.category_children || []).map((child: any) => ({
        title: child.name,
        url: `/${locale}?category=${child.handle}`,
      })),
    }))
  }, [categories, locale])

  return (
    <Sidebar
      className="!top-[--header-height] !bottom-0 !h-auto"
      {...props}
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mercur Marketplace</span>
                  <span className="truncate text-xs">Premium Products</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex-1 min-h-0 overflow-y-auto">
        <NavMain items={navMain} />
        <NavSecondary items={data.navSecondary} regions={regions} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="flex-shrink-0 border-t border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
