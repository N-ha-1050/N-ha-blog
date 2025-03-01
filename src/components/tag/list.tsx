import { Tag } from "@prisma/client"
import { TagBadge } from "@/components/tag/badge"
import { BadgeProps } from "../ui/badge"

export function TagList({
    tags,
    isLink = false,
    ...props
}: {
    isLink?: boolean
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
                    {...props}
                />
            ))}
        </div>
    )
}
