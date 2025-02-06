"use client"
import Header from "./Header";
import { usePathname } from "next/navigation";

export const HeaderWrapper = () => {
    const pathname = usePathname();
    const isSearchPage = pathname === "/search";
    if (pathname === "/auth/login") return null;
    return <Header isSearchPage={isSearchPage} />
}