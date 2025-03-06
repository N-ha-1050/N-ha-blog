"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Props = {
    content: string
    setContent: (content: string) => void
}

export function ContentTextarea({ content, setContent }: Props) {
    return (
        <div className="flex size-full flex-col gap-4">
            <Label htmlFor="content-textarea">Content</Label>
            <Textarea
                id="content-textarea"
                className="min-h-full w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    )
}
