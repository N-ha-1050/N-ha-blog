import { TagList } from "@/components/tag/list"
import { Input } from "@/components/ui/input"

type Props = {
    tags: string[]
    setTags: (tags: string[]) => void
}

export function TagsEditor({ tags, setTags }: Props) {
    return (
        <>
            <TagList
                tags={tags.map((tag) => ({
                    name: tag,
                }))}
            />
            <Input
                placeholder="Add a tag"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setTags([...tags, e.currentTarget.value])
                        e.currentTarget.value = ""
                    }
                }}
            />
        </>
    )
}
