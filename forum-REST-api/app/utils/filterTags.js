import Tag from "../models/tags.js";


export async function searchForTags(filter) {
    let tagQuery = Tag.find();

    if (filter.tags) {
        tagQuery = questionQuery.find({ 
            tags: { $in: filter.tags } 
        });
    }

    return tagQuery.lean();
}
