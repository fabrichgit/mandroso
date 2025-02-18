export function image(id?: string) {
    return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${id}`
}

export function avatars(){
    const placeholders = [
        "https://api.dicebear.com/9.x/pixel-art/svg?seed=",
        "https://api.dicebear.com/9.x/big-ears/svg?seed=",
        "https://api.dicebear.com/9.x/big-smile/svg?seed=",
        "https://api.dicebear.com/9.x/micah/svg?seed=",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=",
        "https://api.dicebear.com/9.x/avataaars/svg?seed=",
        "https://api.dicebear.com/9.x/open-peeps/svg?seed=",
        "https://api.dicebear.com/9.x/notionists/svg?seed=",
        "https://api.dicebear.com/9.x/lorelei/svg?seed=",
        "https://api.dicebear.com/9.x/croodles-neutral/svg?seed=",
        "https://api.dicebear.com/9.x/thumbs/svg?seed=",
        "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=",
        "https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=",
        "https://api.dicebear.com/9.x/identicon/svg?seed="
    ]

    return placeholders.map(place => {
        return Array.from({length: 10}).map((_, i) => place+i+"man")
        .concat(Array.from({length: 10}).map((_, i) => place+i+"femal"))
    })
}