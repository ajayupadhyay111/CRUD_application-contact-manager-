import express from 'express'
import { connection } from './postgres/postgres.js';
import contactRoutes from './view/routes.js'
import cors from 'cors'
const app = express();

app.use(cors())
app.use(express.json())

app.use("/",contactRoutes)

app.listen(4000,()=>{
    connection();
    console.log("server is running on port ",4000)
})