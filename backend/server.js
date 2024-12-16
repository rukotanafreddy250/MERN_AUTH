import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;
import userRouter from './routes/userRoutes.js'
import connectDB from './utilities/connectDB.js';

connectDB();
const app = express();

app.use(express.json()); //help to parse json data.
app.use(express.urlencoded({ extended: true })) // help to send form data.

app.use(cookieParser())


app.use('/api/users', userRouter);
 
app.get('/', () => res.send('Server is ready'));



app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(` Server Started on port ${port}`));