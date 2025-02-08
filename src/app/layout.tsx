import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "@/styles/globals.css";
import 'react-photo-view/dist/react-photo-view.css';
import StoreProvider from "./StoreProvider";
import Providers from "@/components/LayoutComponent/ProgressBarProvider";
import { HeaderWrapper } from "@/components/LayoutComponent/Header/HeaderWrapper";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social App",
  description: "Suffering feeds to update news from your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bodyScroll overflow-y-auto`} suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            themes={['dark', 'light']}
            storageKey="theme"
            disableTransitionOnChange={true}
          >
            <Providers>
              <HeaderWrapper />
              {children}
              <Toaster />
            </Providers>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
