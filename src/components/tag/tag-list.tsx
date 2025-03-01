import { Tag } from "@prisma/client"
import { TagBadge } from "@/components/tag/tag-badge"

export function TagList({
    tags,
    className,
    isLink,
}: {
    tags: Tag[]
    className?: string
    isLink?: boolean
}) {
    return (
        <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
                <TagBadge
                    className={className}
                    variant="outline"
                    key={tag.name}
                    tag={tag}
                    isLink={isLink}
                />
            ))}
        </div>
    )
}
