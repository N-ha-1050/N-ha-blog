import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({ redirectTo: "/login" })
            }}
        >
            <Button>ログアウト</Button>
        </form>
    )
}
