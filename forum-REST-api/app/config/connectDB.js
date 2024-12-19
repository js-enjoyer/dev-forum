import { connect } from "mongoose";

export default async function connectDB() {
    try {
        const url = process.env.DB_URL;

        await connect(url, { dbName: 'dev-forum' });

        console.log('Successfully connected to Mongo database');
    } catch (err) {
        console.log(`Cannot connect to DB: ${err.message}`);
    }
}