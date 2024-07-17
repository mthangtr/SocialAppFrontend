"use client";
import { useAppSelector } from "@/libs/hooks";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import { UserType } from "@/types/Global";

export default function Home() {
    const user: UserType = useAppSelector((state) => (state as { auth: { userInfo: UserType } }).auth.userInfo);
    if (user) {
        redirect("/home/newsfeed");
    } else {
        redirect("/auth/login");
    }
}
