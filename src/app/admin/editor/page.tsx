import { CreateForm } from "@/components/editor/create-form"
import { auth } from "@/lib/auth"
import { getPost } from "@/lib/db"
import { notFound } from "next/navigation"
import { Suspense } from "react"

const validId = (id: string) => id && id.length === 36

export default async function Editor({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>
}) {
    const { id } = await searchParams
    const session = await auth()
    if (!session?.user?.isAdmin) notFound()
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">Editor</h1>
            <Suspense fallback="loading...">
                <EditorWithFetch
                    id={id}
                    name={session.user.name || "Unknown"}
                />
            </Suspense>
        </div>
    )
}

async function EditorWithFetch({ id, name }: { id?: string; name: string }) {
    if (!id) return <CreateForm name={name} />
    if (!validId(id))
        return <CreateForm name={name} message={`Invalid ID: ${id}`} />
    const session = await auth()
    const isAdmin = session?.user?.isAdmin
    const post = await getPost({ id, isAdmin })
    if (!post)
        return <CreateForm name={name} message={`Post not found: ${id}`} />
    return <CreateForm name={name} post={post} />
}
