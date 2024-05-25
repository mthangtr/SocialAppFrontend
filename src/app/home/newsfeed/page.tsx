"use client";
import InputStatus from '@/components/Pages/NewsFeedComp/InputStatus';
import Post from '@/components/Pages/NewsFeedComp/Posts';

export default function NewsFeed() {
    return (
        <div className="container mx-auto p-6">
            <InputStatus />
            <Post />
        </div>
    );
}
