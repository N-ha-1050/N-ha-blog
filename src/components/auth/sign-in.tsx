"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInAction } from "@/lib/auth-actions"

const errors = [
    { id: "Configuration", message: "Configuration error." },
    { id: "AccessDenied", message: "Access denied." },
    { id: "Verification", message: "Verification error." },
    { id: "Default", message: "Something went wrong." },
    { id: "CredentialsSignin", message: "Invalid credentials." },
    { id: "OAuthAccountNotLinked", message: "Account not linked." },
]

type Props = {
    callbackUrl?: string
    error?: string
}

export function SignIn({ callbackUrl = "/auth", error }: Props) {
    const [errorId, formAction, isPending] = useActionState(
        async (prevState: string | undefined, formData: FormData) => {
            formData.append("redirectTo", callbackUrl)
            return await signInAction(formData)
        },
        error,
    )

    const errorMessage = errors.find(({ id }) => id === errorId)?.message
    return (
        <div className="flex flex-col items-stretch gap-4">
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <form
                action={formAction}
                className="flex flex-col items-stretch gap-2"
            >
                <Label htmlFor="email">Email</Label>
                <Input
                    disabled={isPending}
                    id="email"
                    name="email"
                    type="email"
                />
                <Label htmlFor="password">Password</Label>
                <Input
                    disabled={isPending}
                    id="password"
                    name="password"
                    type="password"
                />
                <Button disabled={isPending}>Sign In</Button>
            </form>
        </div>
    )
}
