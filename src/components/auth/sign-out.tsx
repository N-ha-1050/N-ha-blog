"use client"

import { Button } from "@/components/ui/button"
import { signOutAction } from "@/lib/auth-actions"
import { useActionState } from "react"

export function SignOut() {
    const [, formAction, isPending] = useActionState(signOutAction, undefined)
    return (
        <form action={formAction}>
            <Button disabled={isPending} variant="destructive">
                ログアウト
            </Button>
        </form>
    )
}
