import { Form } from "@/components/editor/form"
import { auth } from "@/lib/auth"
import { getPost } from "@/lib/db"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import "katex/dist/katex.min.css"
import "highlight.js/styles/base16/google-dark.min.css"

const validId = (id: string) => id && id.length === 36

export default async function Editor({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>
}) {
    // User認証
    const session = await auth()
    const isAdmin = session?.user.isAdmin
    if (!isAdmin) notFound()

    // 個別記事取得
    const { id } = await searchParams
    const rowPost = id && validId(id) ? await getPost({ id, isAdmin }) : null
    const post = rowPost
        ? { ...rowPost, tags: rowPost.tags.map((tag) => tag.name) }
        : null

    return (
        <div className="flex size-full flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">Editor</h1>
            <Suspense>
                <Form
                    post={post}
                    id={rowPost?.id}
                    isAdmin={isAdmin}
                    userName={session.user.name ?? "Unknown"}
                />
            </Suspense>
        </div>
    )
}
