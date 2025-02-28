import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export function Logo() {
    return (
        <Link
            href="/"
            className={buttonVariants({
                variant: "link",
                className: "my-4 p-4 text-5xl",
            })}
        >
            N_ha
        </Link>
    )
}
