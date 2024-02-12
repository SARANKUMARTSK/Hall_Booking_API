import express from 'express';
const app = express();
const PORT = process.env.PORT||8000;
import AppRoutes from './routes/index.js';

app.use(express.json());
app.use('/',AppRoutes);



app.listen(PORT,()=>console.log(`App is Running in ${PORT}`))