"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { changeName } from "@/lib/user"
import { useActionState } from "react"

export function ChangeName({ name, email }: { name: string; email: string }) {
    const [errorMessage, formAction, isPending] = useActionState(
        async (prevState: string | undefined, formData: FormData) => {
            formData.append("email", email)
            return await changeName(formData)
        },
        undefined,
    )
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>名前を変更</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>名前を変更</DialogTitle>
                    <DialogDescription>
                        新しい名前を入力してください。変更が完了したらログアウトされます。
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    {errorMessage && (
                        <p className="text-red-600">{errorMessage}</p>
                    )}
                    <Label htmlFor="name">新しい名前</Label>
                    <Input
                        className="mb-2"
                        name="name"
                        placeholder="新しい名前"
                        defaultValue={name}
                    />
                    <Label htmlFor="password">パスワード</Label>
                    <Input
                        className="mb-4"
                        name="password"
                        placeholder="パスワード"
                        type="password"
                    />
                    <Button disabled={isPending}>変更</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
