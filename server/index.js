import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import yourimageRoutes from './routes/yourimageRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/yourimage', yourimageRoutes);

app.get('/', async(req,res)=>{
    res.send("Hello from Haolin's AI");
})

const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, ()=> console.log('Server has started on port http://localhost:8080'))
    }catch(error){
        console.log(error);

    }

}

startServer();