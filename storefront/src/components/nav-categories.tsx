"use client"

import { ChevronRight } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavCategoriesProps {
    categories: HttpTypes.StoreProductCategory[]
    locale?: string
}

export function NavCategories({ categories, locale = "" }: NavCategoriesProps) {
    const localePrefix = locale ? `/${locale}` : ""

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70">Categories</SidebarGroupLabel>
            <SidebarMenu>
                {categories.map((category) => (
                    <Collapsible key={category.id} asChild defaultOpen={false}>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={category.name}>
                                <a href={`${localePrefix}/categories/${category.handle}`} className="text-sidebar-foreground">
                                    <span>{category.name}</span>
                                </a>
                            </SidebarMenuButton>
                            {category.category_children?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90 text-sidebar-foreground">
                                            <ChevronRight />
                                            <span className="sr-only">Toggle</span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {category.category_children?.map((childCategory) => (
                                                <SidebarMenuSubItem key={childCategory.id}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={`${localePrefix}/categories/${childCategory.handle}`} className="text-sidebar-foreground">
                                                            <span>{childCategory.name}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
