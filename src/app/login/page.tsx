import { SignIn } from "@/components/auth/sign-in"
import { CANONICAL_BASE_URL } from "@/lib/config"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "ログイン",
    description: "ログインページです。",
    alternates: { canonical: `${CANONICAL_BASE_URL}/login` },
}
export default async function Login(props: {
    searchParams: Promise<{
        callbackUrl?: string
        error?: string
    }>
}) {
    const searchParams = await props.searchParams
    const callbackUrl = searchParams.callbackUrl ?? "/auth"
    const error = searchParams.error
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">ログイン</h1>
            <SignIn callbackUrl={callbackUrl} error={error} />
        </div>
    )
}
