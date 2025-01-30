import Providers from "@/components/LayoutComponent/ProgressBarProvider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <main className="min-h-screen">
                <div className="flex items-center justify-center h-full">
                    <div className="w-full">{children}</div>
                </div>
            </main>
        </Providers>
    );
}