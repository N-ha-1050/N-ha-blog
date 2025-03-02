import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export function NavigationLink({ href, text }: { href: string; text: string }) {
    return (
        <Link className={buttonVariants({ variant: "ghost" })} href={href}>
            {text}
        </Link>
    )
}
