import { DownloadLink } from "@/components/post/download-link"
import { Textarea } from "@/components/ui/textarea"
import { auth } from "@/lib/auth"
import { getAllPosts } from "@/lib/db"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const metadata: Metadata = {
    title: "JSON",
    description: "管理者用の記事データ一括ダウンロードページです。",
}

export default async function Json() {
    return (
        <div className="flex grow flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">JSON</h1>
            <Suspense fallback="Loading...">
                <JsonWithFetch />
            </Suspense>
        </div>
    )
}

async function JsonWithFetch() {
    const session = await auth()
    const isAdmin = session?.user?.isAdmin ?? false
    if (!isAdmin) return notFound()
    const posts = await getAllPosts({ isAdmin })
    return (
        <>
            <Textarea
                className="mb-4 size-full grow"
                value={JSON.stringify({ posts }, null, 4)}
                readOnly
            />
            <DownloadLink posts={posts} />
        </>
    )
}
