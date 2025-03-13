import { ModeToggle } from "@/components/layout/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { User } from "lucide-react"
import { Fragment } from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Navigation({
    isOpen,
    setOpen,
    navigationLinks,
}: {
    isOpen: boolean
    setOpen: (isOpen: boolean) => void
    navigationLinks: { href: string; text: string }[]
}) {
    return (
        <nav className={`${isOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col items-stretch rounded bg-blue-300 p-2 dark:bg-blue-900 md:flex-row md:gap-2 md:bg-transparent md:p-0 dark:md:bg-transparent">
                {navigationLinks.map((props) => (
                    <Fragment key={props.text}>
                        <li className="flex flex-col items-stretch">
                            <NavigationLink
                                {...props}
                                onClick={() => setOpen(!isOpen)}
                            />
                        </li>
                        <Separator className="my-2 md:hidden" />
                    </Fragment>
                ))}
                <li className="flex gap-2 self-end">
                    <Link
                        href="/login"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                        })}
                    >
                        <User />
                    </Link>
                    <ModeToggle />
                </li>
            </ul>
        </nav>
    )
}

function NavigationLink({
    text,
    ...props
}: {
    href: string
    text: string
    onClick?: () => void
}) {
    return (
        <Link className={buttonVariants({ variant: "ghost" })} {...props}>
            {text}
        </Link>
    )
}
