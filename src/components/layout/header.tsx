import { Logo } from "@/components/layout/logo"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { NavigationLink } from "./navigation-link"

const navigationLinks: { url: string; displayName: string }[] = [
    { url: "/posts", displayName: "Posts" },
]

export function Header() {
    return (
        <header className="bg-blue-400 dark:bg-blue-900">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
                <Logo />
                <nav className="flex gap-4">
                    {navigationLinks.map(({ url, displayName }) => (
                        <NavigationLink
                            key={displayName}
                            href={url}
                            text={displayName}
                        />
                    ))}
                    <ModeToggle />
                </nav>
            </div>
        </header>
    )
}
