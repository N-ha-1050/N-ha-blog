import Link from "next/link.js"

type PostProps = {
    post: {
        id: string
        title: string
        content: string
        tags: { name: string }[]
        isVisible: boolean
    }
}

export function PostCard({ post }: PostProps) {
    return (
        <Link href={`/posts/${post.id}`}>
            <h1>{post.title}</h1>
            <ul>
                {post.tags.map((tag) => (
                    <li key={tag.name}>{tag.name}</li>
                ))}
            </ul>
        </Link>
    )
}
