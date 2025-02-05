"use client"
import Header from "./Header";
import { usePathname } from "next/navigation";

export const HeaderWrapper = () => {
    const pathname = usePathname();
    if (pathname === "/auth/login") return null;
    return <Header />
}