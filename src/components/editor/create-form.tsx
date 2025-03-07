"use client"

import { ReactNode, useState } from "react"
import { TitleEditor } from "@/components/editor/title-editor"
import { VisibleCheckbox } from "@/components/editor/visible-checkbox"
import { TagsAdder } from "@/components/editor/tags-adder"
import { TagsViewer } from "@/components/editor/tags-viewer"
import { ContentViewer } from "@/components/editor/content-viewer"
import { ContentTextarea } from "@/components/editor/content-textarea"
import { Button, buttonVariants } from "../ui/button"
import { createPost, updatePost } from "@/lib/db"
import { Post, Tag } from "@prisma/client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

type Props = {
    message?: string
    post?: Post & { tags: Tag[] }
    name: string
}

export function CreateForm({ message: defaultMessage, post, name }: Props) {
    const [title, setTitle] = useState(post?.title || "")
    const [content, setContent] = useState(post?.content || "")
    const [isVisible, setVisible] = useState(post?.isVisible || false)
    const [tags, setTags] = useState<string[]>(
        post?.tags.map((tag) => tag.name) || [],
    )
    const [isLoading, setLoading] = useState(false)
    const [message, setMessage] = useState(defaultMessage)
    const localstoragePrefix = post?.id ? `${post.id}` : "create"
    const save = (
        title: string,
        content: string,
        tags: string[],
        isVisible: boolean,
    ) => {
        localStorage.setItem(`${localstoragePrefix}-content`, content)
        localStorage.setItem(`${localstoragePrefix}-title`, title)
        localStorage.setItem(`${localstoragePrefix}-tags`, JSON.stringify(tags))
        localStorage.setItem(
            `${localstoragePrefix}-visible`,
            isVisible ? "true" : "false",
        )
    }

    const read = () => {
        const title = localStorage.getItem(`${localstoragePrefix}-title`) || ""
        const content =
            localStorage.getItem(`${localstoragePrefix}-content`) || ""
        const tags = JSON.parse(
            localStorage.getItem(`${localstoragePrefix}-tags`) || "[]",
        )
        const isVisible =
            localStorage.getItem(`${localstoragePrefix}-visible`) === "true"
        setTitle(title)
        setContent(content)
        setTags(tags)
        setVisible(isVisible)
    }
    const alerts: { title: string; description?: ReactNode }[] = [
        { title: "Message", description: message },
        {
            title: "User Name",
            description: (
                <Link
                    href="/auth"
                    className={buttonVariants({ variant: "link" })}
                >
                    {name}
                </Link>
            ),
        },
        {
            title: "Post Detail",
            description: post?.id ? (
                <>
                    <Link
                        href={`/posts/${post.id}`}
                        className={buttonVariants({ variant: "link" })}
                    >
                        Link
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
    return (
        <div className="grid w-full grid-cols-4 gap-4">
            {alerts.map(
                ({ title, description }) =>
                    description && (
                        <Alert className="col-span-2 col-start-2" key={title}>
                            <AlertTitle>{title}</AlertTitle>
                            <AlertDescription>{description}</AlertDescription>
                        </Alert>
                    ),
            )}
            <div className="col-span-3 self-center">
                <TitleEditor title={title} setTitle={setTitle} />
            </div>
            <div className="col-span-1 self-center">
                <VisibleCheckbox
                    isVisible={isVisible}
                    setVisible={setVisible}
                />
            </div>
            <div className="col-span-1 self-center">
                <TagsAdder tags={tags} setTags={setTags} />
            </div>
            <div className="col-span-3 self-center">
                <TagsViewer tags={tags} setTags={setTags} />
            </div>
            <div className="col-span-2 mb-8">
                <ContentTextarea
                    content={content}
                    setContent={(newContent: string) => {
                        save(title, newContent, tags, isVisible)
                        setContent(newContent)
                    }}
                />
            </div>
            <div className="col-span-2">
                <ContentViewer content={content} />
            </div>
            <Button
                variant="secondary"
                className="col-span-1"
                onClick={() => {
                    read()
                    setMessage("Restored from local storage.")
                }}
                disabled={isLoading}
            >
                Road
            </Button>
            <Button
                variant="secondary"
                className="col-span-1"
                onClick={() => {
                    save(title, content, tags, isVisible)
                    setMessage("Saved to local storage.")
                }}
                disabled={isLoading}
            >
                Save
            </Button>
            <Button
                variant="destructive"
                className="col-span-1"
                onClick={() => {
                    setTitle("")
                    setContent("")
                    setVisible(false)
                    setTags([])
                    setMessage("Cleared.")
                }}
                disabled={isLoading}
            >
                Clear
            </Button>
            <Button
                className="col-span-1"
                onClick={async () => {
                    setLoading(true)
                    try {
                        if (post?.id) {
                            // update
                            const updatedPost = await updatePost({
                                id: post.id,
                                title,
                                content,
                                tags: tags.map((name) => ({ name })),
                                isVisible,
                            })
                            console.dir(updatedPost, { depth: null })
                            setMessage(`Post updated. (id: ${updatedPost.id})`)
                        } else {
                            // create
                            const createdPost = await createPost({
                                title,
                                content,
                                tags: tags.map((name) => ({ name })),
                                isVisible,
                            })
                            console.dir(createdPost, { depth: null })
                            setMessage(`Post created. (id: ${createdPost.id})`)
                        }
                    } catch (error) {
                        setMessage(error as string)
                    }
                    setLoading(false)
                }}
                disabled={isLoading}
            >
                {post?.id ? "Update" : "Create"}
            </Button>
        </div>
    )
}
