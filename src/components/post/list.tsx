import { PostCard, PostCardSkeleton } from "@/components/post/card"
import { PostPagination, PostPaginationSkeleton } from "./pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Post, Tag } from "@prisma/client"
import { POSTS_PER_PAGE } from "@/lib/fetch"

export async function PostList({
    posts,
    postsCount,
}: {
    posts: (Post & { tags: Tag[] })[]
    postsCount: number
}) {
    const lastPage = ((postsCount + POSTS_PER_PAGE - 1) / POSTS_PER_PAGE) | 0 // Math.ceil(allPages / POSTS_PER_PAGE) と同じ
    return (
        <>
            {postsCount === 0 ? (
                <p>記事が見つかりませんでした。</p>
            ) : (
                <>
                    <p>検索結果: {postsCount}件</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    <PostPagination lastPage={lastPage} />
                </>
            )}
        </>
    )
}

export function PostListSkeleton() {
    return (
        <>
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            </div>
            <PostPaginationSkeleton />
        </>
    )
}
