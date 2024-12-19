export interface User { 
    _id: string,
    username: string, 
    email: string
}

export interface ContentUser {
    _id: string,
    username: string, 
    email: string,
    image: string,
    location?: string,
    description?: string,
    saves?: string[],
    reputation: number,
    upvotes: number,
    downvotes: number,
    createdAt: Date,
    updatedAt: Date
}