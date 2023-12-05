import express  from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoutes.js";
import cors from 'cors';


import dotenv from "dotenv";
dotenv.config();


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

import path from "path"


mongoose
.connect(process.env.mongoDBURL)
.then(()=>{
    // console.log('App connected to DataBase');
    // app.listen(process.env.PORT, ()=>{
    //     console.log(`App is listening on port: ${process.env.PORT} : http://localhost:5555`);
    // })

    // deployment config
    const port=process.env.PORT || 5555

    let __dirname = path.resolve();

    if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
    }

    app.listen(port, ()=>{
        console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`);
    });
        
})
.catch((err)=>{
    console.log(err);
})


