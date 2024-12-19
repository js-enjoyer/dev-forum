import User from "../models/users.js";
import bcrypt from 'bcrypt'

import { chechForUser } from "../utils/checkForUser.js";
import { jwt } from "../lib/jwt.js";
import { compareOldPasswords } from "../utils/compareOldPassword.js";
import { SALT_ROUNDS } from "../config/constants.js";
import { log } from "util";

const login = async function({ username, password }) {
    const user = await chechForUser.onLogin(username, password);

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    return token;
}

const register = async function(inputData) {
    await chechForUser.onRegister(inputData);

    return User.create(inputData);
}

const update = async function(inputData, id) {
    let user = await User.findById(id);
    if(!user) {
        throw new Error('User not found')
    }

    if(inputData.oldPassword.length && inputData.newPassword.length) {
        await compareOldPasswords( inputData.oldPassword, user.password );

        user.password = await bcrypt.hash(inputData.newPassword, SALT_ROUNDS);
    }
    console.log(inputData.description);
    if (inputData.username) user.username = inputData.username;
    if (inputData.email) user.email = inputData.email;
    if (inputData.location) user.location = inputData.location;
    if (inputData.description) user.description = inputData.description;
    if (inputData.image) user.image = inputData.image;

    return await User.findByIdAndUpdate(id, user, { new: true, runValidators: true });
}
export const authServices = {
    login,
    register,
    update
}