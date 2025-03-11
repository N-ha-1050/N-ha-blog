import {
    ContentTextarea,
    Reset,
    TagsDisplay,
    TagsInput,
    TitleInput,
    VisibleCheckbox,
} from "@/components/editor-cookie/cookie"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { auth } from "@/lib/auth"
import { getPost } from "@/lib/db"
import { DraftPost, loadDraft } from "@/lib/editor-cookie"
import { markReact } from "@/lib/markdown"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import "katex/dist/katex.min.css"
import "highlight.js/styles/base16/google-dark.min.css"

const alertUser = (userName: string) => (
    <Link href="/auth" className={buttonVariants({ variant: "link" })}>
        {userName}
    </Link>
)

const alertPostDetail = (postId: string) => (
    <>
        <Link
            href={`/post/${postId}`}
            className={buttonVariants({ variant: "link" })}
        >
            Page
        </Link>
        <Link
            href="/admin/editor/cookie"
            className={buttonVariants({ variant: "link" })}
        >
            Create New Post
        </Link>
    </>
)

const Info = ({
    title,
    description,
    className = "col-span-2 col-start-2",
}: {
    title: string
    description?: React.ReactNode
    className?: string
}) => {
    if (!description) return null
    return (
        <Alert className={className}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

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
    const rowPost = id ? await getPost({ id, isAdmin }) : null
    const post: DraftPost | null = rowPost
        ? { ...rowPost, tags: rowPost.tags.map((tag) => tag.name) }
        : null

    // 下書き取得
    const cookiePrefix = rowPost?.id ?? "create"
    const draftPost = await loadDraft(cookiePrefix)

    // 情報表示
    const alerts: { title: string; description?: React.ReactNode }[] = [
        {
            title: "User Name",
            description: alertUser(session.user.name ?? "Unknown"),
        },
        {
            title: "Post Detail",
            description: rowPost ? alertPostDetail(rowPost.id) : undefined,
        },
    ]

    return (
        <div className="flex size-full flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">
                Editor<span className="ml-4 text-sm">Cookie Version</span>
            </h1>

            {/* エディター本体 */}
            <div className="grid size-full grid-cols-4 gap-4">
                {/* 情報表示 */}
                {alerts.map(({ title, description }) => (
                    <Info key={title} title={title} description={description} />
                ))}

                {/* タイトル */}
                <div className="col-span-3 flex w-full items-center gap-2 self-center">
                    <Label htmlFor="title">Title</Label>
                    <TitleInput
                        id="title"
                        placeholder="Title"
                        cookiePrefix={cookiePrefix}
                        draftTitle={draftPost.title}
                    />
                </div>

                {/* 公開設定 */}
                <div className="col-span-1 flex items-center gap-2 self-center">
                    <VisibleCheckbox
                        id="visible"
                        cookiePrefix={cookiePrefix}
                        draftIsVisible={draftPost.isVisible}
                    />
                    <Label htmlFor="visible">Visible</Label>
                </div>

                {/* タグ設定(入力欄) */}
                <div className="col-span-1 flex items-center gap-2 self-center">
                    <Label htmlFor="tags">Tags</Label>
                    <TagsInput
                        id="tags"
                        placeholder="Enter to add a tag"
                        cookiePrefix={cookiePrefix}
                        draftTags={draftPost.tags}
                    />
                </div>

                {/* タグ設定(表示欄) */}
                <div className="col-span-3 self-center">
                    <TagsDisplay
                        cookiePrefix={cookiePrefix}
                        draftTags={draftPost.tags}
                    />
                </div>

                {/* 本文 */}
                <div className="col-span-2 mb-8 flex size-full flex-col gap-4">
                    <Label htmlFor="content">Content</Label>
                    <ContentTextarea
                        id="content"
                        cookiePrefix={cookiePrefix}
                        draftContent={draftPost.content}
                    />
                </div>

                {/* プレビュー */}
                <div className="col-span-2 flex size-full flex-col gap-4">
                    <Label htmlFor="preview">Preview</Label>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Preview
                            draftContent={draftPost.content}
                            id="preview"
                        />
                    </Suspense>
                </div>

                {/* 下書きリセット */}
                <Reset
                    className="col-span-2"
                    post={post}
                    cookiePrefix={cookiePrefix}
                />
            </div>
        </div>
    )
}

type PreviewProps = {
    draftContent: string
    id?: string
}

async function Preview({ draftContent, id }: PreviewProps) {
    const parsedDraft = draftContent ? await markReact(draftContent) : null
    return (
        <div
            id={id}
            className="prose prose-lg prose-slate max-w-none dark:prose-invert"
        >
            {parsedDraft}
        </div>
    )
}
