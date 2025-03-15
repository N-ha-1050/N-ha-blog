import { PostList, PostListSkeleton } from "@/components/post/list"
import Search from "@/components/post/search"
import { TagList } from "@/components/tag/list"
import { getPosts, getPostsCount } from "@/lib/db"
import { Suspense } from "react"
import Tags from "@/components/post/tags"
import { CANONICAL_BASE_URL } from "@/lib/config"

type Props = {
    searchParams: Promise<{
        q?: string | string[] // 検索クエリ
        p?: string | string[] // ページ番号
        t?: string | string[] // タグ
        v?: string | string[] // 公開設定
    }>
}
export async function generateMetadata({ searchParams }: Props) {
    const { query, page, tags, isVisible } = await parseSearchParams({
        searchParams,
    })
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (page > 1) params.set("p", String(page))
    if (tags.length > 0) tags.sort().forEach((tag) => params.append("t", tag))
    if (isVisible !== undefined) params.set("v", isVisible ? "t" : "f")
    return {
        title: "記事一覧",
        description: "記事一覧ページです。",
        alternates: {
            canonical:
                params.size > 0
                    ? `${CANONICAL_BASE_URL}/posts?${params.toString()}`
                    : `${CANONICAL_BASE_URL}/posts`,
        },
    }
}

async function parseSearchParams({ searchParams }: Props) {
    const { q, p, t, v } = await searchParams
    const query = Array.isArray(q) ? q[0] : (q ?? "")
    const page = Number(Array.isArray(p) ? p[0] : p) || 1
    const tags = Array.isArray(t) ? t : t ? [t] : []
    const isVisibleText = Array.isArray(v) ? v[0] : v
    const isVisible =
        isVisibleText === "t" ? true : isVisibleText === "f" ? false : undefined
    return { query, page, tags, isVisible }
}

export default async function Posts({ searchParams }: Props) {
    const { query, page, tags, isVisible } = await parseSearchParams({
        searchParams,
    })

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">記事一覧</h1>
            <div className="flex items-center gap-2">
                <Search placeholder="検索" />
                <Tags />
            </div>
            <TagList
                tags={tags.map((name) => ({ name }))}
                className="text-lg"
            />
            <Suspense key={query + page + tags} fallback={<PostListSkeleton />}>
                <PostsListWithFetch
                    query={query}
                    page={page}
                    tags={tags}
                    isVisible={isVisible}
                />
            </Suspense>
        </div>
    )
}

async function PostsListWithFetch({
    query,
    page,
    tags,
    isVisible,
}: {
    query: string
    page: number
    tags: string[]
    isVisible?: boolean
}) {
    const [posts, postsCount] = await Promise.all([
        getPosts({ page, query, tags, isVisible }),
        getPostsCount({ query, tags, isVisible }),
    ])
    return <PostList posts={posts} postsCount={postsCount} />
}
