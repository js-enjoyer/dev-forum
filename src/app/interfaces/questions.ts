import { Tag } from "./tags";

export interface Question {
    _id: String,
    title: String,
    description: String,
    code: String,
    tags: Tag[],
    owner_id: String,
    upvotes: Number,
    answers: Number,
    downvotes: Number,
    views: Number,
    createdAt: Date,
    updatedAt: Date,
}