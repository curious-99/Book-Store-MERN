import express  from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send('<h2>Welcome</h2>')
});

app.use('/books', booksRoute);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to DataBase');
    app.listen(PORT, ()=>{
        console.log(`App is listening on port: ${PORT} : http://localhost:5555`);
    })
    
})
.catch((err)=>{
    console.log(err);
})