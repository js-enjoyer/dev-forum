import { Tag } from "./tags";
import { ContentUser } from "./user";

export interface Question {
    _id: String,
    title: String,
    description: String,
    code: String,
    tags: Tag[],
    owner_id: ContentUser,
    upvotes: Number,
    answers: Number,
    downvotes: Number,
    views: Number,
    createdAt: Date,
    updatedAt: Date,
}