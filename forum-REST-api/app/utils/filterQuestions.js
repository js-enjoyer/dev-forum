import Question from "../models/question.js";

export async function searchForQuestions(filter) {
    let questionQuery = Question.find();

    if (filter.search) {
        questionQuery = questionQuery.find({ 
            title: { $regex: filter.search, $options: 'i' } 
        });
    }

    if (filter.tags && filter.tags.length > 0) {
        questionQuery = questionQuery.find({ 
            tags: { $in: filter.tags } 
        });
    }

    return questionQuery.populate('tags').populate('owner_id').lean();
}
