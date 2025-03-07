"use client"

import { Post, Tag } from "@prisma/client"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"

type Props = {
    posts: (Post & { tags: Tag[] })[]
}

export function DownloadLink({ posts }: Props) {
    const [url, setUrl] = useState("")
    useEffect(() => {
        const data = new Blob([JSON.stringify({ posts }, null, 4)], {
            type: "application/json",
        })
        setUrl(URL.createObjectURL(data))
    }, [posts])
    return (
        <a
            href={url}
            download="posts.json"
            className={buttonVariants({ variant: "link" })}
        >
            Download JSON
        </a>
    )
}
