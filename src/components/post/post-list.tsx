import { prisma } from "@/lib/prisma"
import { PostCard, PostCardSkeleton } from "@/components/post/post-card"

export async function PostList() {
    const posts = await prisma.post.findMany({
        // where: { isVisible: true },
        orderBy: { createdAt: "desc" },
        include: { tags: true },
    })
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

export function PostListSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <PostCardSkeleton key={i} />
            ))}
        </div>
    )
}
