export interface Question {
    _id: String,
    title: String,
    description: String
    tags: String[],
    owner_id: String,
    upvotes: Number,
    answers: Number,
    downvotes: Number,
    views: Number,
    createdAt: Date,
    updatedAt: Date,
}