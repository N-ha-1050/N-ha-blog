import { Tag } from "@prisma/client"
import { TagBadge } from "@/components/tag/tag-badge"

export function TagList({ tags }: { tags: Tag[] }) {
    return (
        <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
                <TagBadge variant="outline" key={tag.name} tag={tag} />
            ))}
        </div>
    )
}
