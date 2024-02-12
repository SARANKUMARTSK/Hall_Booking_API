import { Router } from "express";
const router = Router()
import RoomsRouter from './rooms.js'


router.get('/',(req,res)=>{
    res.status(200).send(`
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hall Booking API</title>
    <style>
    .container{
     border: 1px solid black;
     height: auto;
     width: 100%;
     align-items: center;
     display: flex;
     justify-content: space-around;
     background-color: black;
     min-height: 150px;
     border-radius: 10px;
    }
    .getBookings{
        border: 1px solid black;
        height: 300px;
        width: 300px;
    }
    h1{
     text-align: center;
     color: red;
     text-shadow: 1px 1px 2px black;
    }
    button{
      padding: 10px;
      font-weight: 900;
      color: white;
      background-color: orangered;
      border-radius: 8px;
      box-shadow: 1px 1px 5px orangered;
    }
    button:hover{
        transform: scale(1.08);
        transition: ease-in-out 200ms all;
        box-shadow: 2px 2px 15px orangered;
    }
    .image{
        min-height: 350px;
        background-position: center;
        background-image: url("https://static.businessworld.in/article/article_extra_large_image/1598015126_YvTjER_banquet_hall.jpg");
    }
    </style>
</head>
<body>
    <h1>Welcome to My Hall Booking </h1>
    <div class="container">
       <a href="https://hall-booking-api-6xz5.onrender.com/rooms/booking"><button>Get bookings Data</button></a> 
       <a href="https://hall-booking-api-6xz5.onrender.com/rooms/customer"><button>Get Customer Data</button></a> 
       <a href="https://hall-booking-api-6xz5.onrender.com/rooms/getCount/customer-01"><button>Get Customer Bookings</button></a> 
    </div>
    <div class="image">

    </div>
    
</body>
</html>
    `)
});
router.use('/rooms',RoomsRouter)


export default router