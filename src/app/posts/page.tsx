import { PostList, PostListSkeleton } from "@/components/post/post-list"
import { Suspense } from "react"

export default function Posts() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">記事一覧</h1>
            <Suspense fallback={<PostListSkeleton />}>
                <PostList />
            </Suspense>
        </div>
    )
}
