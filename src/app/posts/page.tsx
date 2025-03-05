import { PostList, PostListSkeleton } from "@/components/post/list"
import Search from "@/components/post/search"
import { TagList } from "@/components/tag/list"
import { getPosts, getPostsCount } from "@/lib/db"
import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
    title: "記事一覧",
    description: "記事一覧ページです。",
}

export default async function Posts({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string | string[]
        p?: string | string[]
        t?: string | string[]
    }>
}) {
    const session = await auth()
    const isAdmin = session?.user?.isAdmin ?? false
    const { q, p, t } = await searchParams
    const query = Array.isArray(q) ? q[0] : (q ?? "")
    const page = Number(Array.isArray(p) ? p[0] : p) || 1
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
                <PostsListWithFetch
                    query={query}
                    page={page}
                    tags={tags}
                    isAdmin={isAdmin}
                />
            </Suspense>
        </div>
    )
}

async function PostsListWithFetch({
    query,
    page,
    tags,
    isAdmin,
}: {
    query: string
    page: number
    tags: string[]
    isAdmin: boolean
}) {
    const [posts, postsCount] = await Promise.all([
        getPosts({ page, query, tags, isAdmin }),
        getPostsCount({ query, tags, isAdmin }),
    ])
    return <PostList posts={posts} postsCount={postsCount} />
}
