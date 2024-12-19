import bcrypt from 'bcrypt'

import User from '../models/users.js';
import { log } from 'util';

async function onRegister({ username, email, password }) {
    const usernameCount = await User.countDocuments({ username });
    const emailCount = await User.countDocuments({ email });
    const passwordCount = await User.countDocuments({ password });
    
    if (usernameCount > 0) {
        throw new Error('Username already exists');
    }
    if (emailCount > 0) {
        throw new Error('Email already exists');
    }
    if (passwordCount > 0) {
        throw new Error('Password already exists');
    }
}

async function onLogin(username, password) {
    const user = await User.findOne({ username });

    let hashedPassword = user ? user.password : '';
    let passwordMatches = await bcrypt.compare(password, hashedPassword);

    if(!user || !passwordMatches) {
        throw new Error('Incorrect username or password!')
    }

    return user;
}

export const chechForUser = {
    onRegister,
    onLogin
}