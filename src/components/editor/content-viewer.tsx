"use client"

import { markReactSync } from "@/lib/markdown"
import { Label } from "@/components/ui/label"

type Props = { content: string }

export function ContentViewer({ content }: Props) {
    return (
        <div className="flex w-full flex-col gap-4">
            <Label htmlFor="content-textarea">Viewer</Label>
            <div
                id="content-viewer"
                className="prose prose-lg prose-slate max-w-none dark:prose-invert"
            >
                {markReactSync(content)}
            </div>
        </div>
    )
}
