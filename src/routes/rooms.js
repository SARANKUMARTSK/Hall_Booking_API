import { Router } from "express";
const router = Router();
import RoomsController from '../controller/rooms.js'

router.post('/',RoomsController.createRoom);
router.post('/booking',RoomsController.roomBooking);    
router.get('/booking',RoomsController.getBookingData);
router.get('/customer',RoomsController.getCustomerData);
router.get('/getCount/:customer_name',RoomsController.getCount)


export default router