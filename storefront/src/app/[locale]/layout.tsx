import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { listCategories } from "@/lib/data/categories"
import { listRegions } from "@/lib/data/regions"
import { retrieveCustomer } from "@/lib/data/customer"
import { AuthProvider } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth-modal"

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params

    // Fetch categories, regions and customer data from backend
    const { parentCategories } = await listCategories()
    const regions = await listRegions()
    const customer = await retrieveCustomer().catch(() => null)

    return (
        <AuthProvider customer={customer} locale={locale}>
            <div className="[--header-height:calc(theme(spacing.14))]">
                <SidebarProvider className="flex flex-col">
                    <SiteHeader />
                    <div className="flex flex-1">
                        <AppSidebar categories={parentCategories} locale={locale} regions={regions} />
                        <SidebarInset className="w-full overflow-x-hidden">
                            <div className="w-full min-w-0">
                                {children}
                            </div>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
                <AuthModal />
            </div>
        </AuthProvider>
    )
}