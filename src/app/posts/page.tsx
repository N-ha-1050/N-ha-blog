import { PostList } from "@/components/posts/post-list"
import { Suspense } from "react"

export default function Posts() {
    return (
        <>
            <h1>Posts</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <PostList />
            </Suspense>
        </>
    )
}
