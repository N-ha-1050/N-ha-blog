import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function Post(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params
    if (!id || id.length !== 36) notFound()
    const post = await prisma.post.findUnique({
        where: { id, isVisible: true },
        include: { tags: true },
    })
    if (!post) notFound()
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}
