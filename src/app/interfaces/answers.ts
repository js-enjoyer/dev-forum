import { User } from "./user";

export interface Answer {
    _id: String,
    description: String,
    code: String,
    owner_id: User,
    upvotes: Number,
    downvotes: Number,
    createdAt: Date,
    updatedAt: Date,
}