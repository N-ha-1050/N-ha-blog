import { Tag } from "@prisma/client"
import { Badge, badgeVariants } from "@/components/ui/badge"
import Link from "next/link"

export function TagBadge({
    tag,
    isLink,
    className,
    variant,
}: {
    tag: Tag
    isLink?: boolean
    variant?: "outline" | "default"
    className?: string
}) {
    if (isLink) {
        return (
            <Link
                href={`/posts?t=${tag.name}`}
                className={badgeVariants({ variant, className })}
            >
                {tag.name}
            </Link>
        )
    }
    return (
        <Badge className={className} variant={variant}>
            {tag.name}
        </Badge>
    )
}
