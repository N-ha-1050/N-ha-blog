import Link from "next/link.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TagList } from "@/components/tag/list"

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
            <Card className="h-36 w-64 hover:border-foreground">
                <CardHeader>
                    <CardTitle className="truncate">{post.title}</CardTitle>
                    <TagList tags={post.tags} />
                </CardHeader>
                <CardContent className="truncate">{post.content}</CardContent>
            </Card>
        </Link>
    )
}

export function PostCardSkeleton() {
    return (
        <Card className="h-36 w-64 animate-pulse">
            <CardHeader>
                <CardTitle className="truncate">
                    <Skeleton className="h-4" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="mb-2 h-4" />
                <Skeleton className="h-4" />
            </CardContent>
        </Card>
    )
}
