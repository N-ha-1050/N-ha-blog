import { TagBadge } from "@/components/tag/badge"
import { TagList } from "../tag/list"

type Props = {
    tags: string[]
    setTags: (tags: string[]) => void
}

export function TagsViewer({ tags, setTags }: Props) {
    return tags.length > 0 ? (
        <TagList
            tags={tags.map((name) => ({ name }))}
            tagClick={(tag) =>
                setTags(tags.filter((name) => name !== tag.name))
            }
            variant="default"
        />
    ) : (
        <p>タグが選択されていません。</p>
    )
}
