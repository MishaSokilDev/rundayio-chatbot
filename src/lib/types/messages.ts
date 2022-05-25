interface Block {
    message?: string,
    commands?: string[],
    link?: {
        href: string,
        title: string
    },
    button?: {
        title: string,
        callback: () => void
    } 
}

interface Messages {
    blocks: Block[]
    isUser?: boolean
}


export type { Block, Messages }