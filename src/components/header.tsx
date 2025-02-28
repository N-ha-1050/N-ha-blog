import { Logo } from "@/components/logo"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

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
