import express,{json} from 'express';
import cors from'cors';
import router from './routes/index.js';

const server=express();
server.use(cors());
server.use(json());

server.use(router);

server.listen(process.env.PORT,()=>{
    console.log("listening to port 5000");
})