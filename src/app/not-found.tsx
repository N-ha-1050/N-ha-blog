import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">404 Not Found</h1>
            <p>指定されたページはありません。</p>
            <Link href="/" className={buttonVariants({ variant: "link" })}>
                トップに戻る
            </Link>
        </div>
    )
}
