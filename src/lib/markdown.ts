import rehypeReact from "rehype-react"
import { remark } from "remark"
import remarkRehype from "remark-rehype"
import production from "react/jsx-runtime"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"

const markMdastProcessor = remark()
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkMath)

const markHastProcessor = markMdastProcessor()
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeHighlight)

const markReactProcessor = markHastProcessor().use(rehypeReact, production)

export const markReact = async (markdown: string) => {
    const result = await markReactProcessor().process(markdown)
    const react = result.result
    return react
}

export const markReactSync = (markdown: string) => {
    const result = markReactProcessor().processSync(markdown)
    const react = result.result
    return react
}
