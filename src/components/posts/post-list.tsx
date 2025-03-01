import { prisma } from "@/lib/prisma"
import { PostCard } from "@/components/posts/post-card"

export async function PostList() {
    const posts = await prisma.post.findMany({
        include: { tags: true },
    })
    return (
        <>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </>
    )
}
