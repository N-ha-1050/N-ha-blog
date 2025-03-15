"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TagList } from "@/components/tag/list"
import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

export default function Tags() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handleChange = () => {
        const params = new URLSearchParams(searchParams)
        params.delete("p")
        params.delete("t")
        tags.forEach((tag) => params.append("t", tag))
        replace(`${pathname}?${params.toString()}`)
    }
    const [tags, setTags] = useState(searchParams.getAll("t") || [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>タグを設定</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>タグを設定</DialogTitle>
                    <DialogDescription>
                        タグをクリックすると削除できます。
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="flex gap-2"
                    action={(formData: FormData) => {
                        const formTags = new Set(
                            formData
                                .get("tags")
                                ?.toString()
                                .split(",")
                                .filter((tag) => tag && !tags.includes(tag)),
                        )
                        setTags([...tags, ...formTags])
                    }}
                >
                    <Input name="tags" placeholder="タグ名" />
                    <Button variant="secondary">追加</Button>
                </form>
                <TagList
                    className="text-lg"
                    tags={tags.map((name) => ({ name }))}
                    tagClick={(tag) => {
                        setTags(tags.filter((name) => tag.name !== name))
                    }}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handleChange}>
                            OK
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={() => setTags([])}>
                        Clear
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
