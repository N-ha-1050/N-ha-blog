import { PostList, PostListSkeleton } from "@/components/post/list"
import Search from "@/components/post/search"
import { TagList } from "@/components/tag/list"
import { Suspense } from "react"

export default async function Posts(props: {
    searchParams?: Promise<{
        q?: string | string[]
        p?: string | string[]
        t?: string | string[]
    }>
}) {
    const searchParams = await props.searchParams
    const q = searchParams?.q
    const query = Array.isArray(q) ? q[0] : (q ?? "")
    const p = searchParams?.p
    const page = Number(Array.isArray(p) ? p[0] : p) || 1
    const t = searchParams?.t
    const tags = Array.isArray(t) ? t : t ? [t] : []
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">記事一覧</h1>
            <Search placeholder="検索" />
            <TagList
                tags={tags.map((name) => ({ name }))}
                className="text-lg"
            />
            <Suspense key={query + page + tags} fallback={<PostListSkeleton />}>
                <PostList page={page} query={query} tags={tags} />
            </Suspense>
        </div>
    )
}
