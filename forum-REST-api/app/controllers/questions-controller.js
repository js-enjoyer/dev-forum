import { Router } from "express";

import Question from "../models/question.js";
import Tag from "../models/tags.js";
import { log } from "util";
import { searchForQuestions } from "../utils/filterQuestions.js";
import { searchForTags } from "../utils/filterTags.js";
import { Types } from "mongoose";

const router = Router();

router.get('/recommended', async (req, res) => {
    try {
        console.log('attempting to fetch questions');

        const questions = await Question.find()
        .populate('tags')
        .populate('owner_id')
        .sort({ createdAt: -1 })
        .lean();

        console.log('qeustions fetched');

        res.status(200).json(questions);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

router.get('/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const objectId = new Types.ObjectId(id)

        console.log('attempting to fetch  user questions');

        const questions = await Question.find({ owner_id: objectId }).populate('tags').lean();
    
        console.log('qeustions fetched');

        res.status(200).json(questions);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

router.post('/search', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        console.log('attempting to fetch searched questions');

        const questions = await searchForQuestions(data);

        console.log('qeustions fetched');

        res.status(200).json(questions);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

router.post('/create', async (req, res) => {
    try {
        console.log('attempting to create');
        const questionData = req.body;
        console.log(questionData);

        const newQuestion = await Question.create(questionData);
        console.log('created');

        
        res.status(201).json(newQuestion);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

router.get('/:id/details', async (req, res) => {
    const id = req.params.id
    try {
        console.log('attempting to fetch question');

        const currQuestion = await Question.findById(id).populate('tags').populate('owner_id').lean();

        console.log('qeustion fetched');

        res.status(200).json(currQuestion);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

router.get('/tags', async (req, res) => {
    try {
        console.log('attempting to fetch tags');

        const tags = await Tag.find().lean();
        console.log('fetched');

        res.status(200).json(tags);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error fetching tags' });
    }
});

router.post('/tags/search', async (req, res) => {
    const data = req.body;
    
    try {
        console.log('attempting to fetch searched tags');

        const tags = await searchForTags(data);

        if(!tags.length) {
            res.status(204)
        }

        console.log('fetched');

        res.status(200).json(tags);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error fetching searched tags' });
    }
});

export default router;
