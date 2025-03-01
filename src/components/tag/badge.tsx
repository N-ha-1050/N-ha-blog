import { Tag } from "@prisma/client"
import { Badge, BadgeProps } from "@/components/ui/badge"
import Link from "next/link"

export function TagBadge({
    tag,
    isLink = false,
    ...props
}: {
    tag: Tag
    isLink?: boolean
} & BadgeProps) {
    const tagBadge = <Badge {...props}>{tag.name}</Badge>

    if (isLink) {
        return <Link href={`/posts?t=${tag.name}`}>{tagBadge}</Link>
    }

    return tagBadge
}
