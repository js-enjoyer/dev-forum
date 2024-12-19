import { Router } from "express";

import Answer from "../models/answers.js";
import { Types } from "mongoose";

const router = Router();


router.post('/create', async (req, res) => {
    const inputData = req.body;

    try {
        console.log('attempting to create answer');
        await Answer.create(inputData);

        console.log('created answer successfully');

        res.status(200).json({ message: "Created Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
})

router.get('/question/:id', async (req, res) => {
    const question_id = req.params.id; 

    try {
        console.log('Attempting to fetch answers for question:', question_id);

        const objectId =  new Types.ObjectId(question_id);

        const answers = await Answer.find({ question_id: objectId }).populate('owner_id').lean();

        console.log('Answers fetched successfully:', answers);

        res.status(200).json(answers);
    } catch (err) {
        console.log('Error fetching answers:', err.message);
        res.status(409).json({ message: err.message });
    }
});

router.get('/:id/upvote', async (req, res) => {
    const answerId = req.params.id;

    try {
        console.log('attempting to upvote');

        const answer = await Answer.findById(answerId);
        answer.upvotes += 1;
        const saved = await answer.save();
        console.log('Upvoted successfully');

        const populatedSaved = await Answer.findById(saved._id)
            .populate('owner_id')

        res.status(200).json(populatedSaved);
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
})

router.get('/:id/downvote', async (req, res) => {
    const answerId = req.params.id;

    try {
        console.log('attempting to downvote');

        const answer = await Answer.findById(answerId);
        answer.downvotes += 1;
        const saved = await answer.save();
        console.log('Downvoted successfully');

        const populatedSaved = await Answer.findById(saved._id)
            .populate('owner_id')

        res.status(200).json(populatedSaved);
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
})

export default router;