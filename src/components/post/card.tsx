import Link from "next/link.js"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TagList } from "@/components/tag/list"
import { Post, Tag } from "@prisma/client"
import { formatDate } from "@/lib/date"

export function PostCard({ post }: { post: Post & { tags: Tag[] } }) {
    return (
        <Link href={`/posts/${post.id}`}>
            <Card className="flex h-36 w-64 flex-col justify-between hover:border-foreground">
                <CardHeader>
                    <CardTitle className="truncate">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                    <TagList tags={post.tags} />
                </CardContent>
                <CardFooter>
                    <p>{formatDate(post.createdAt)}</p>
                </CardFooter>
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
