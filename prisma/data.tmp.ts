type Tag = { name: string }

type Post = {
    title: string
    content: string
    tags: Tag[]
    is_visible: boolean
    created_at: string
    updated_at: string
}

type User = {
    name: string
    email: string
    password: string
    is_active: boolean
    is_admin: boolean
}

export const data: {
    tags: Tag[]
    posts: Post[]
    users: User[]
} = {
    tags: [{ name: "test" }],
    posts: [
        {
            title: "About",
            content:
                "## N_ha のプロフィール\n### Languages\nやったことのある言語\n\n1. **vb(vbs, vba, vb.net)**\n\n    vbsがプログラミングを始めたきっかけ。中学の部室のPCにあった。vbsは簡単なツール作るのに今でもたまに使う。\n\n0. **hsp**\n\n    これも中学の部活のPCにあった。簡単にグラフィックができて楽しかった。最近はやってない。\n\n0. **html/css**(言語ではないが)\n\n    中学の技術の教科書にあったので部活で暇なときに独学。その後触ってない(react + chkraui に移動)。\n\n0. **python**\n\n    中学卒業あたりに始めた。文法がわかりやすくて感動した。現在のメイン言語。djangoはこのサイトのバックエンド。\n\n0. **c++**\n\n    高校入ってから部活でやる競プロのために少し(APG4bレベル)やった。なお現在はほとんどpython。\n\n0. **ruby**\n\n    高校のとき参加した高大連携のプログラムで学んだ。このときはc言語も少しやった。基礎文法レベル。\n\n0. **go**\n\n    高校で一時期ハマってた(基礎文法と少し競プロ）。今はもう書ける自信ない。\n\n0. **typescript(javascript)**\n\n    高校入ってから部活でreactだけ少しやった。初心者です。もっと勉強したい(目標はreact使いこなす→nextjs)。reactはこのサイトのフロントエンド。",
            is_visible: true,
            created_at: "2022-03-25 14:52",
            updated_at: "2023-05-12 22:57",
            tags: [{ name: "test" }],
        },
    ],
    users: [
        {
            name: "User",
            email: "user@nextmail.com",
            password: "123456",
            is_active: true,
            is_admin: false,
        },
    ],
}
