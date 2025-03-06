import { TagBadge } from "@/components/tag/badge"

type Props = {
    tags: string[]
    setTags: (tags: string[]) => void
}

export function TagsViewer({ tags, setTags }: Props) {
    return tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
            {tags.map((name) => (
                <TagBadge
                    key={name}
                    tag={{ name }}
                    onClick={() => setTags(tags.filter((tag) => tag !== name))}
                />
            ))}
        </div>
    ) : (
        <p>タグが選択されていません。</p>
    )
}
