import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export async function SignIn({ callbackUrl = "/auth", error }: Props) {
    const errorMessages = errors.find(({ id }) => id === error)?.message
    return (
        <div className="flex flex-col items-stretch gap-4">
            {errorMessages && <p className="text-red-600">{errorMessages}</p>}
            <form
                className="flex flex-col items-stretch gap-2"
                action={async (formData) => {
                    "use server"
                    try {
                        formData.append("redirectTo", callbackUrl)
                        await signIn("credentials", formData)
                    } catch (error) {
                        if (error instanceof AuthError) {
                            return redirect(`/login?error=${error.type}`)
                        }
                        throw error
                    }
                }}
            >
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" />
                <Button>Sign In</Button>
            </form>
            {/* TODO: アカウント連携機能を作ったら公開 */}
            {/* {providerMap.map(({ id, name }) => (
                <form
                    className="flex flex-col items-stretch gap-2"
                    key={id}
                    action={async () => {
                        "use server"
                        try {
                            await signIn(id, { redirectTo: callbackUrl })
                        } catch (error) {
                            if (error instanceof AuthError) {
                                return redirect(`/login?error=${error.type}`)
                            }
                            throw error
                        }
                    }}
                >
                    <Button>Sign in with {name}</Button>
                </form>
            ))} */}
        </div>
    )
}
