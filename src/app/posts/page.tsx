import { PostList, PostListSkeleton } from "@/components/post/post-list"
import Search from "@/components/post/search"
import { Suspense } from "react"

export default async function Posts(props: {
    searchParams?: Promise<{ q?: string; p?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.q ?? ""
    const page = Number(searchParams?.p) || 1
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">記事一覧</h1>
            <Search placeholder="" />
            <Suspense key={query + page} fallback={<PostListSkeleton />}>
                <PostList page={page} query={query} />
            </Suspense>
        </div>
    )
}
