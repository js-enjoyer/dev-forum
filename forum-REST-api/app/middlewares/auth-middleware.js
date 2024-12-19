import { log } from "util";
import { jwt } from "../lib/jwt.js";


export async function authenticate(req, res, next) {
    const token = req.cookies?.auth;

    if(!token) {
        return next();
    }

    try {
        const decodedPayload = await jwt.verify(token, process.env.JWT_SECRET);

        const user = {
            _id: decodedPayload._id,
            email: decodedPayload.email,
            username: decodedPayload.username
        };
        
        req.user = user;
        req.isAuthenticated = true;

        next();

    } catch (error) {
        res.clearCookie('auth');
        
        return res.status(401).json({ error: 'Invalid Token!' });
    }
}