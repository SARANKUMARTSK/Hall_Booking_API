import { Router } from "express";
const router = Router()
import RoomsRouter from './rooms.js'


router.get('/',(req,res)=>{
    res.status(200).send(`<h1>Welcome to My Express Page</h1>`)
});
router.use('/rooms',RoomsRouter)


export default router