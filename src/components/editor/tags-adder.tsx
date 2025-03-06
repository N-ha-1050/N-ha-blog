import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    tags: string[]
    setTags: (tags: string[]) => void
}

export function TagsAdder({ tags, setTags }: Props) {
    return (
        <div className="flex items-center gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
                id="tags"
                placeholder="Enter でタグを追加"
                onKeyDown={(e) => {
                    const value = e.currentTarget.value
                    if (e.key === "Enter" && value && !tags.includes(value)) {
                        setTags([...tags, e.currentTarget.value])
                        e.currentTarget.value = ""
                    }
                }}
            />
        </div>
    )
}
