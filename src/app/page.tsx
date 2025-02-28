import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const socialLinks: { url: string; displayName: string }[] = [
    { url: "https://github.com/N-ha-1050", displayName: "GitHub" },
    { url: "https://twitter.com/N_ha_1050", displayName: "X(Twitter)" },
    { url: "https://atcoder.jp/users/N_ha_1050", displayName: "AtCoder" },
]

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold">N_ha</h1>
            <p>N_ha のブログです。</p>
            <ul className="flex gap-4">
                {socialLinks.map(({ url, displayName }) => (
                    <li key={displayName}>
                        <Link
                            href={url}
                            className={buttonVariants({
                                variant: "link",
                                className: "text-xl font-normal",
                            })}
                        >
                            {displayName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
