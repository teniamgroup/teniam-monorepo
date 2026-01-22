import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { listCategories } from "@/lib/data/categories"
import { retrieveCustomer } from "@/lib/data/customer"
import { AuthProvider } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth-modal"

export default async function Page({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params

    // Fetch categories and customer data from backend
    const [{ parentCategories }, customer] = await Promise.all([
        listCategories(),
        retrieveCustomer().catch(() => null)
    ])

    return (
        <AuthProvider customer={customer} locale={locale}>
            <div className="[--header-height:calc(theme(spacing.14))]">
                <SidebarProvider className="flex flex-col">
                    <SiteHeader />
                    <div className="flex flex-1">
                        <AppSidebar categories={parentCategories} locale={locale} />
                        <SidebarInset>
                            <div className="flex flex-1 flex-col gap-4 p-4">
                                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                                    <div className="aspect-video rounded-xl bg-muted/50" />
                                    <div className="aspect-video rounded-xl bg-muted/50" />
                                    <div className="aspect-video rounded-xl bg-muted/50" />
                                </div>
                                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                            </div>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
                <AuthModal />
            </div>
        </AuthProvider>
    )
}
