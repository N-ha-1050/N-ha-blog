import { markReact } from "@/lib/markdown"
import { notFound } from "next/navigation"
import { TagList } from "@/components/tag/list"
import { formatDate } from "@/lib/date"
import { getIsAdmin, getPost } from "@/lib/db"
import "katex/dist/katex.min.css"
import "highlight.js/styles/base16/google-dark.min.css"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Edit, Globe, Lock } from "lucide-react"
import { CANONICAL_BASE_URL } from "@/lib/config"

type Props = { params: Promise<{ id: string }> }

const validId = (id: string) => id && id.length === 36

export async function generateMetadata({ params }: Props) {
    const { id } = await params
    if (!validId(id)) return notFound()
    const post = await getPost({ id })
    if (!post) return notFound()
    return {
        title: post.title,
        alternates: { canonical: `${CANONICAL_BASE_URL}/posts/${post.id}` },
    }
}

export default async function Post({ params }: Props) {
    const { id } = await params
    if (!validId(id)) return notFound()
    const isAdmin = await getIsAdmin()
    const post = await getPost({ id })
    if (!post) return notFound()
    const createdAt = formatDate(post.createdAt)
    const updatedAt = formatDate(post.updatedAt)
    const content = await markReact(post.content)
    return (
        <div>
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            {isAdmin && (
                <div className="mb-4 flex items-center gap-4">
                    {post.isVisible ? <Globe /> : <Lock />}
                    <Link
                        href={`/admin/editor?id=${post.id}`}
                        className={buttonVariants()}
                    >
                        <Edit />
                        Edit
                    </Link>
                </div>
            )}
            <TagList className="mb-4 text-lg" tags={post.tags} isLink />
            <div className="mb-8 md:flex md:gap-8">
                <p>作成日 {createdAt}</p>
                <p>更新日 {updatedAt}</p>
            </div>
            <div className="prose prose-lg prose-slate max-w-none dark:prose-invert">
                {content}
            </div>
        </div>
    )
}
