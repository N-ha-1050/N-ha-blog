import Link from "next/link"

export function Logo() {
    return (
        <Link
            href="/"
            className="my-2 rounded-full border-2 border-transparent p-4 text-4xl text-foreground duration-200 hover:border-foreground"
        >
            N_ha
        </Link>
    )
}
