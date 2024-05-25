export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen">
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </main>
    );
}