import { Logo } from "@/components/layout/logo"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme/mode-toggle"

export function Header() {
    return (
        <header className="mx-auto flex max-w-7xl items-center justify-between px-4">
            <Logo />
            <nav className="flex gap-4">
                <Link
                    className={buttonVariants({
                        variant: "ghost",
                    })}
                    href="/posts"
                >
                    Posts
                </Link>
                <ModeToggle />
            </nav>
        </header>
    )
}
