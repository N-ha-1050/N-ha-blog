import { Tag } from "@prisma/client"
import { TagBadge } from "@/components/tag/badge"
import { BadgeProps } from "@/components/ui/badge"

export function TagList({
    tags,
    isLink = false,
    tagClick,
    ...props
}: {
    isLink?: boolean
    tagClick?: (tag: Tag) => void
    tags: Tag[]
} & BadgeProps) {
    return (
        <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
                <TagBadge
                    variant="outline"
                    key={tag.name}
                    tag={tag}
                    isLink={isLink}
                    onClick={
                        tagClick && !isLink ? () => tagClick(tag) : undefined
                    }
                    {...props}
                />
            ))}
        </div>
    )
}
