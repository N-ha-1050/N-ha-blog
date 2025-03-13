"use client"

export type DraftPost = {
    title: string
    content: string
    tags: string[]
    isVisible: boolean
}

export const defaultPost: DraftPost = {
    title: "",
    content: "",
    tags: [],
    isVisible: false,
}

export function loadDraft(prefix: string) {
    const {
        title: defaultTitle,
        content: defaultContent,
        tags: defaultTags,
    } = defaultPost
    const draftPost: DraftPost = {
        title: localStorage.getItem(`${prefix}-title`) ?? defaultTitle,
        content: localStorage.getItem(`${prefix}-content`) ?? defaultContent,
        tags:
            localStorage
                .getItem(`${prefix}-tags`)
                ?.split(",")
                .filter((tag) => tag) ?? defaultTags,
        isVisible: localStorage.getItem(`${prefix}-visible`) === "true",
    }
    return draftPost
}

export function saveDraft(prefix: string, post: DraftPost) {
    localStorage.setItem(`${prefix}-title`, post.title)
    localStorage.setItem(`${prefix}-content`, post.content)
    localStorage.setItem(`${prefix}-tags`, post.tags.join(","))
    localStorage.setItem(`${prefix}-visible`, post.isVisible.toString())
}
