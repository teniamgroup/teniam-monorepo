export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-background text-foreground min-h-screen">
            {children}
        </div>
    )
}
