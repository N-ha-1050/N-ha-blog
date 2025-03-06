"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = { title: string; setTitle: (title: string) => void }

export function TitleEditor({ title, setTitle }: Props) {
    return (
        <div className="flex w-full items-center gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
                id="title"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    )
}
