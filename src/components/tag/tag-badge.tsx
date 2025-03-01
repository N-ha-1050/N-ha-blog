import { Tag } from "@prisma/client"
import { Badge, BadgeProps } from "@/components/ui/badge"

export function TagBadge({ tag, ...props }: { tag: Tag } & BadgeProps) {
    return <Badge {...props}>{tag.name}</Badge>
}
