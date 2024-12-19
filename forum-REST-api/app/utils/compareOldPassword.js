import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '../config/constants.js';
import { log } from 'util';

export async function compareOldPasswords(oldPass, userPass) {
    let passwordMatches = await bcrypt.compare(oldPass, userPass);

    if(!passwordMatches) {
        throw new Error('Old Password is Invalid!')
    }
}