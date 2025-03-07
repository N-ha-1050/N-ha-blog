import { CreateForm } from "@/components/editor/create-form"
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
    const { id } = await searchParams
    const session = await auth()
    if (!session?.user?.isAdmin) notFound()
    const user: { name: string; isAdmin: boolean } = {
        name: session.user.name ?? "Unknown",
        isAdmin: session.user.isAdmin ?? false,
    }
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">Editor</h1>
            <Suspense fallback="Loading...">
                <EditorWithFetch id={id} user={user} />
            </Suspense>
        </div>
    )
}

async function EditorWithFetch({
    id,
    user,
}: {
    id?: string
    user: { name: string; isAdmin: boolean }
}) {
    if (!id) return <CreateForm user={user} />
    if (!validId(id))
        return <CreateForm user={user} message={`Invalid ID: ${id}`} />
    const session = await auth()
    const isAdmin = session?.user?.isAdmin
    const post = await getPost({ id, isAdmin })
    if (!post)
        return <CreateForm user={user} message={`Post not found: ${id}`} />
    return <CreateForm user={user} post={post} />
}
