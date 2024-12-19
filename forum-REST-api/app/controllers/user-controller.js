import { Router } from "express";

import User from "../models/users.js";
import { authServices } from "../services/authServices.js";
import { log } from "util";

const router = Router();

router.get('/profile', async(req, res) => {
    if(!req.isAuthenticated) {
        return res.status(401).json({ message: 'Not Authenticated!' });
    }

    const userId = req.user?._id;

    try {
        console.log('attempting to fetch tags');

        const profile = await User.findOne({ _id: userId }, { password: 0, __v: 0, image: 0 }).lean();
        const payload = {
            _id: profile._id,
            email: profile.email,
            username: profile.username,
        }

        res.status(200).json(payload);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
    
})

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        console.log('attempting to log in');
        const token = await authServices.login({ username, password });

        console.log('log in successfull');

        res.cookie('auth', token, { httpOnly: true, sameSite: 'lax' });

        //res.status(200).json({ message: 'Logged in successfully!' });
        res.redirect('/user/profile')

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
    
})

router.post('/register', async (req, res) => {
    const inputData = req.body;
    
    try {
        console.log('attempting to register');
        await authServices.register(inputData);

        console.log('register successfull');

        res.status(200).json({ message: "Registerd Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
})

router.get('/logout', async(req, res) => {
    try {
        console.log('attempting to logout');

        res.clearCookie('auth');
        console.log('logged out');

        res.status(200).json({message: 'Logout successfull'});

    } catch (error) {
        res.status(500).json({ message: 'Error Logging Out' });
    }
    
})

router.get('/users', async(req, res) => {
    const userId = req.query.id

    try {
        console.log('attempting to users');

        const users = await User.find().lean();
        console.log('users fetched');

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
    
})

router.get('/:id', async(req, res) => {
    const userId = req.params.id
    try {
        console.log('attempting to fetch user');

        const currentUser = await User.findOne({ _id: userId }, { password: 0, __v: 0 }).lean();
        console.log('user fetched');

        res.status(200).json(currentUser);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
    
})

router.post('/edit', async (req, res) => {
    const inputData = req.body;
    const user = req.user;

    try {
        console.log('attempting to update');
        await authServices.update(inputData, user._id);

        console.log('update successfull');

        res.status(200).json({ message: "Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
})

router.get('/:id/upvote', async (req, res) => {
    const userId = req.params.id;
    console.log(userId);

    try {
        console.log('attempting to upvote');

        const user = await User.findById(userId);
        user.upvotes += 1;
        await user.save();
        console.log('Upvoted successfully');

        res.status(200).json({message: 'User updated'});
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
})

router.get('/:id/downvote', async (req, res) => {
    const userId = req.params.id;

    try {
        console.log('attempting to downvote');

        const user = await User.findById(userId);
        user.downvotes += 1;
        await user.save();
        console.log('downvoted successfully');

        res.status(200).json({message: 'User updated'});
    } catch (err) {
        console.log(err.message);
        res.status(409).json({ message: err.message });
    }
})

export default router;