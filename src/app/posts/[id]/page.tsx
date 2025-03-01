import { markReact } from "@/lib/markdown"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { TagList } from "@/components/tag/list"
import "katex/dist/katex.min.css"
import "highlight.js/styles/base16/google-dark.min.css"

type Props = { params: Promise<{ id: string }> }

async function getPost(params: Props) {
    const { id } = await params.params
    if (!id || id.length !== 36) notFound()
    const post = await prisma.post.findUnique({
        where: { id, isVisible: true },
        include: { tags: true },
    })
    if (!post) notFound()
    return post
}

export async function generateMetadata(params: Props) {
    const post = await getPost(params)
    return {
        title: post.title,
    }
}

const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
}

export default async function Post(props: Props) {
    const post = await getPost(props)
    const createdAt = new Date(post.createdAt)
    const updatedAt = new Date(post.updatedAt)
    const content = await markReact(post.content)
    return (
        <div>
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <TagList className="mb-4 text-lg" tags={post.tags} isLink />
            <div className="mb-8 md:flex md:gap-8">
                <p>作成日 {createdAt.toLocaleDateString("ja-JP", options)}</p>
                <p>更新日 {updatedAt.toLocaleDateString("ja-JP", options)}</p>
            </div>
            <div className="prose prose-lg prose-slate max-w-none dark:prose-invert">
                {content}
            </div>
        </div>
    )
}
