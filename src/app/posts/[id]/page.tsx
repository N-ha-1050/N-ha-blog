import { markReact } from "@/lib/markdown"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { TagList } from "@/components/tag/tag-list"
import "katex/dist/katex.min.css"
import "highlight.js/styles/base16/google-dark.min.css"

const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
}
export default async function Post(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params
    if (!id || id.length !== 36) notFound()
    const post = await prisma.post.findUnique({
        where: { id, isVisible: true },
        include: { tags: true },
    })
    if (!post) notFound()
    const createdAt = new Date(post.createdAt)
    const updatedAt = new Date(post.updatedAt)
    const content = await markReact(post.content)
    return (
        <div>
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <TagList className="mb-4 text-lg" tags={post.tags} isLink />
            <div className="mb-8 md:flex md:gap-8">
                <p>作成日 {createdAt.toLocaleDateString(undefined, options)}</p>
                <p>更新日 {updatedAt.toLocaleDateString(undefined, options)}</p>
            </div>
            <div className="prose prose-lg prose-slate dark:prose-invert">
                {content}
            </div>
        </div>
    )
}
