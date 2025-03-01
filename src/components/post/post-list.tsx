import { prisma } from "@/lib/prisma"
import { PostCard, PostCardSkeleton } from "@/components/post/post-card"

const POSTS_PER_PAGE = 12

export async function PostList({
    page,
    query,
}: {
    page: number
    query: string
}) {
    const posts = await prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
                {
                    tags: {
                        some: {
                            name: { contains: query, mode: "insensitive" },
                        },
                    },
                },
            ],
            // isVisible: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        include: { tags: true },
    })
    return (
        <div>
            {posts.length === 0 && <p>記事が見つかりませんでした。</p>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export function PostListSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                <PostCardSkeleton key={i} />
            ))}
        </div>
    )
}
