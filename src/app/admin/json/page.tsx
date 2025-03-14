import { DownloadLink } from "@/components/post/download-link"
import { Textarea } from "@/components/ui/textarea"
import { getAllPosts } from "@/lib/db"
import { Metadata } from "next"
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
    const posts = await getAllPosts()
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
