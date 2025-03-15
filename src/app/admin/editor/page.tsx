import { EditorForm } from "@/components/editor/form"
import { auth } from "@/lib/auth"
import { getPost } from "@/lib/db"
import { Suspense } from "react"
import "katex/dist/katex.min.css"
import "highlight.js/styles/base16/google-dark.min.css"
import { Metadata } from "next"

const validId = (id: string) => id && id.length === 36

export const metadata: Metadata = {
    title: "Editor",
    description: "管理者用のエディターページです。",
}
export default async function Editor({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>
}) {
    // ユーザー名取得
    const session = await auth()
    const userName = session?.user.name ?? "Unknown"

    // 個別記事取得
    const { id } = await searchParams
    const rowPost = id && validId(id) ? await getPost({ id }) : null
    const post = rowPost
        ? { ...rowPost, tags: rowPost.tags.map((tag) => tag.name) }
        : null

    return (
        <div className="flex size-full flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">Editor</h1>
            <Suspense>
                <EditorForm post={post} id={rowPost?.id} userName={userName} />
            </Suspense>
        </div>
    )
}
