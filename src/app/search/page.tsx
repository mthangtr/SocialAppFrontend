"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchUsersSearchQuery, useFetchPostsSearchQuery } from "@/lib/api/searchApi";
import UsersSearchListSection from "@/components/Pages/SearchPage/UsersSearchListSection";
import { UserType, PostType } from "@/types/Global";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Pages/NewsFeedComp/PostComponents/Posts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
interface UsersSearchResponseProps {
    users: UserType[];
    totalPages: number;
}
interface PostsSearchResponseProps {
    posts: PostType[];
    totalPages: number;
}

const SearchPageRoot = () => {
    const user: UserType = useAppSelector((state) => (state as { auth: { userInfo: UserType } }).auth.userInfo);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query") || "";
    const [pageUsersSearch, setPageUsersSearch] = useState<number>(1);
    const [pagePostsSearch, setPagePostsSearch] = useState<number>(1);
    const [userSearchResults, setUserSearchResults] = useState<UserType[]>([]);
    const [postSearchResults, setPostSearchResults] = useState<PostType[]>([]);
    const [canSeeMore, setCanSeeMore] = useState<boolean>(true);

    const { data: usersSearchResponse } = useFetchUsersSearchQuery({ page: pageUsersSearch, search: searchQuery }) as { data: UsersSearchResponseProps };
    const { data: postsSearchResponse } = useFetchPostsSearchQuery({ page: pagePostsSearch, search: searchQuery }) as { data: PostsSearchResponseProps };
    useEffect(() => {
        if (usersSearchResponse) {
            setUserSearchResults(usersSearchResponse.users);
            if (pageUsersSearch >= usersSearchResponse.totalPages) {
                setCanSeeMore(false);
            }
        }
    }, [usersSearchResponse]);

    useEffect(() => {
        if (postsSearchResponse) {
            const postFiltered = postsSearchResponse.posts.filter((post) => !postSearchResults.find((p) => p._id === post._id));
            setPostSearchResults([...postSearchResults, ...postFiltered]);
        }
    }, [postsSearchResponse]);

    return (
        <>
            <UsersSearchListSection
                userSearchResults={userSearchResults}
                searchQuerry={searchQuery}
                onSeeMoreClick={() => { setPageUsersSearch(pageUsersSearch + 1) }}
                canSeeMore={canSeeMore} />
            <InfiniteScroll
                style={{ overflow: 'visible' }}
                dataLength={postsSearchResponse?.posts.length || 0}
                next={() => setPagePostsSearch(pagePostsSearch + 1)}
                hasMore={pagePostsSearch < postsSearchResponse?.totalPages}
                loader={
                    <>
                    </>
                }
                endMessage={<Button variant="ghost" size="lg" className="flex items-center w-full mt-4" disabled>
                    <div className="flex items-center justify-center space-x-2 text-md font-medium">
                        <span>No more content matched</span>
                    </div>
                </Button>}
            >
                {postsSearchResponse?.posts.map((post) => (
                    <Post key={post._id} postsData={post} user={user} />
                ))}
            </InfiniteScroll>
        </>
    );
};

export default SearchPageRoot;