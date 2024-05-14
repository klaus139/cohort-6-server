import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
dotenv.config();
import connectDB from './config/database.js';

import authRouter from "./routes/authRoute.js"

const app = express();

//connect the database
connectDB();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//define the routes
app.use('/api/v1', authRouter);


const port = process.env.PORT;

app.listen(port, () => console.log(`server is running on port ${port}`))
