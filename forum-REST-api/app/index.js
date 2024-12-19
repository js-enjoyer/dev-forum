import express from 'express'
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/connectDB.js';
import routes from './routes.js';
import { authenticate } from './middlewares/auth-middleware.js';

const app = express();

// MongoDB connection
await connectDB();

app.use(cors({
  origin: 'http://localhost:4200', // Explicitly allow your frontend's URL
  credentials: true, // Allow credentials (cookies) in cross-origin requests
}));
// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(authenticate)

// Sample route
app.use(routes)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port} ....`);
});
