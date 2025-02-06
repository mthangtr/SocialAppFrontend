"use client"
import ProfilePageClient from "@/components/Pages/ProfilePage/ProfilePageClient";
import { useParams } from 'next/navigation';
import { useFetchUserByIdQuery } from "@/lib/api/userApi";
import { UserType } from "@/types/Global";

const ProfilePageRoot = () => {
    const { userid } = useParams() as { userid: string };
    const { data: userDataResponse } = useFetchUserByIdQuery(userid) as { data: UserType };
    return (
        <><ProfilePageClient user={userDataResponse} /></>
    );
}

export default ProfilePageRoot;