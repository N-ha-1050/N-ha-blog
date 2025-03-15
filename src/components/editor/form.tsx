"use client"

import { defaultPost, DraftPost, loadDraft, saveDraft } from "@/lib/editor"
import { ReactNode, useActionState, useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { TagList } from "@/components/tag/list"
import { Textarea } from "@/components/ui/textarea"
import { markReact } from "@/lib/markdown"
import { useDebouncedCallback } from "use-debounce"
import { Button, buttonVariants } from "@/components/ui/button"
import { createPost, updatePost } from "@/lib/db"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Props = {
    post: DraftPost | null
    id?: string
    userName: string
}

export function EditorForm({ id, post, userName }: Props) {
    // 下書き取得用接頭辞
    const prefix = id ?? "create"

    // 下書きのデフォルト値(ロード前に使用)
    const {
        title: defaultTitle,
        content: defaultContent,
        tags: defaultTags,
        isVisible: defaultIsVisible,
    } = defaultPost

    // 編集状態
    const [title, setTitle] = useState<string>(defaultTitle)
    const [content, setContent] = useState<string>(defaultContent)
    const [tags, setTags] = useState<string[]>(defaultTags)
    const [isVisible, setIsVisible] = useState<boolean>(defaultIsVisible)

    // プレビュー
    const [parsedContent, setParsedContent] = useState<ReactNode>(null)

    // 本文変更時
    const handleContentChange = useDebouncedCallback(
        async (content: string) => {
            setParsedContent(await markReact(content))
            saveDraft(prefix, { title, content, tags, isVisible })
        },
        700,
    )

    // リセット
    const reset = () => {
        setTitle(post?.title ?? defaultTitle)
        setContent(post?.content ?? defaultContent)
        setTags(post?.tags ?? defaultTags)
        setIsVisible(post?.isVisible ?? defaultIsVisible)
    }

    // 送信
    const [message, formAction, isPending] = useActionState(async () => {
        if (id) {
            // 更新
            try {
                const updatedPost = await updatePost({
                    id,
                    title,
                    content,
                    tags: tags.map((name) => ({ name })),
                    isVisible,
                })
                // console.dir(updatedPost, { depth: null })
                return `Post updated. (id: ${updatedPost.id})`
            } catch (error) {
                return `Failed to update post. (id: ${id})\nerror: ${error}`
            }
        } else {
            // 作成
            try {
                const createdPost = await createPost({
                    title,
                    content,
                    tags: tags.map((name) => ({ name })),
                    isVisible,
                })
                // console.dir(createdPost, { depth: null })
                return `Post created. (id: ${createdPost.id})`
            } catch (error) {
                return `Failed to create post.\nerror: ${error}`
            }
        }
    }, undefined)

    // 情報表示
    const alerts: { title: string; description?: React.ReactNode }[] = [
        { title: "Message", description: message },
        {
            title: "User Name",
            description: (
                <Link
                    href="/auth"
                    className={buttonVariants({ variant: "link" })}
                >
                    {userName}
                </Link>
            ),
        },
        {
            title: "Post Detail",
            description: id ? (
                <>
                    <Link
                        href={`/posts/${id}`}
                        className={buttonVariants({ variant: "link" })}
                    >
                        Page
                    </Link>
                    <Link
                        href="/admin/editor"
                        className={buttonVariants({ variant: "link" })}
                    >
                        Create New Post
                    </Link>
                </>
            ) : undefined,
        },
    ]

    // 下書き読み込み
    useEffect(() => {
        const {
            title: draftTitle,
            content: draftContent,
            tags: draftTags,
            isVisible: draftIsVisible,
        } = loadDraft(prefix)
        setTitle(draftTitle)
        setContent(draftContent)
        setTags(draftTags)
        setIsVisible(draftIsVisible)
    }, [prefix])

    // プレビューの再描画と保存
    useEffect(() => {
        handleContentChange(content)
    }, [content, handleContentChange])

    return (
        <div className="grid size-full grid-cols-4 gap-4">
            {/* 情報表示 */}
            {alerts.map(
                ({ title, description }) =>
                    description && (
                        <Alert className="col-span-2 col-start-2" key={title}>
                            <AlertTitle>{title}</AlertTitle>
                            <AlertDescription>{description}</AlertDescription>
                        </Alert>
                    ),
            )}

            {/* タイトル */}
            <div className="col-span-3 flex w-full items-center gap-2 self-center">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    className="w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 公開設定 */}
            <div className="col-span-1 flex items-center gap-2 self-center">
                <Checkbox
                    id="isVisible"
                    checked={isVisible}
                    onCheckedChange={(checked) =>
                        setIsVisible(checked === true)
                    }
                />
                <Label htmlFor="isVisible">Visible</Label>
            </div>

            {/* タグ設定(入力欄) */}
            <form
                className="col-span-1 flex items-center gap-2 self-center"
                action={(formData: FormData) => {
                    const formTags = new Set(
                        formData
                            .get("tags")
                            ?.toString()
                            .split(",")
                            .filter((tag) => tag && !tags.includes(tag)),
                    )
                    setTags([...tags, ...formTags])
                }}
            >
                <Label htmlFor="tags">Tags</Label>
                <Input
                    id="tags"
                    name="tags"
                    placeholder="Enter to add a tag"
                    className="w-full"
                />
            </form>

            {/* タグ設定(表示欄) */}
            <div className="col-span-3 self-center">
                <TagList
                    tags={tags.map((name) => ({ name }))}
                    tagClick={(tag) =>
                        setTags(tags.filter((name) => name !== tag.name))
                    }
                />
            </div>

            {/* 本文 */}
            <div className="col-span-2 mb-8 flex size-full flex-col gap-4">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    className="size-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            {/* プレビュー */}
            <div className="col-span-2 flex size-full flex-col gap-4">
                <Label htmlFor="preview">Preview</Label>
                {parsedContent ? (
                    <div className="prose prose-lg prose-slate max-w-none dark:prose-invert">
                        {parsedContent}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>

            {/* 下書き保存 */}
            <Button
                className="col-span-1"
                variant="secondary"
                disabled={isPending}
                onClick={() =>
                    saveDraft(prefix, { title, content, tags, isVisible })
                }
            >
                Save Draft
            </Button>

            {/* 下書きリセット */}
            <Button
                className="col-span-1"
                variant="destructive"
                disabled={isPending}
                onClick={reset}
            >
                Reset
            </Button>

            {/* 送信 */}
            <form
                action={formAction}
                className="col-span-2 flex flex-col items-stretch"
            >
                <Button disabled={isPending}>
                    {post ? "Update" : "Create"}
                </Button>
            </form>
        </div>
    )
}
