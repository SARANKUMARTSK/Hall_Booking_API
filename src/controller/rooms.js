const rooms = [
    {
        "room_id" : 1,
        "room_name" : "Conference Hall 01",
        "seats"  : 30 , 
        "amenities" : "AC",
        "bookingStatus" : true ,
        "pricePerHour" : 300,
    },
    {
        "room_id" : 2,
        "room_name" : "Conference Hall 02",
        "seats"  : 30 , 
        "amenities" : "NON-AC",
        "bookingStatus" : false ,
        "pricePerHour" : 500,
    },
    {
        "room_id" : 3,
        "room_name" : "Conference Hall 03",
        "seats"  : 100 , 
        "amenities" : "AC",
        "bookingStatus" : false ,
        "pricePerHour" : 1000,
    },
    {
        "room_id" : 4,
        "room_name" : "Conference Hall 04",
        "seats"  : 100 , 
        "amenities" : "NON-AC",
        "bookingStatus" : false ,
        "pricePerHour" : 600,
    },
    {
        "room_id" : 5,
        "room_name" : "Conference Hall 05",
        "seats"  : 150 , 
        "amenities" : "AC",
        "bookingStatus" : false ,
        "pricePerHour" : 1500,
    }
]

const booking = [
    {
        "room_id":1,
        "booking_id" : 1,
        "room_name":"Conference Hall 01",
        "customer_name" : "customer-01",
        "customer_mail" : "customer01@gmail.com",
        "customer_phone" : "1111111111",
        "booked_date" : "2024-02-07",
        "start_time" : "08:00 AM",
        "bookingstatus":true,
        "end_time" : "11:00 AM"
    },
]

const findIndex=(array,id)=>{
        for(let i=0 ; i<array.length ; i++){
            if(array[i].id==id)
            return i
        }
        return -1
}



// 1.Creating a Room with :
//       *Number Of Seats Available 
//       *amenities in room
//       *price for 1 Hour
const createRoom = (req,res)=>{
   try {
    let existRoom = rooms.find((rooms)=>{
        return(
            rooms.room_name===req.body.room_name
        );
       
    })

    if(!existRoom){
        let room_id = rooms.length?rooms[rooms.length-1].room_id+1:1;
        let data = req.body;
        data.room_id = room_id;
        rooms.push(data);
        res.status(201).send({
            message:"Room Data Created Successfully "
        })
    }else{
        res.status(200).send({
            message:`Already ${req.body.room_name} is Present . Try With Different Room Name`
        })
    }
    
    
   } catch (error) {
    res.status(500).send({
        message:"Internal Server Error"
    })
   }
}


// 2.Booking a Room with
//      *Customer Name 
//      *Date
//      *Start Time
//      *End Time
//      *Room Id

const roomBooking = (req,res)=>{
    try {
     let roomIndex = undefined;
     rooms.map((value,index)=>{
         if(value.room_id==req.body.room_id){
             roomIndex = index; 
         }
     })

     const existingBooking = booking.find((booking) => {
        return (
          booking.room_id==req.body.room_id && booking.booked_date==req.body.booked_date
        );
      });
   
     if(!existingBooking){
        rooms[roomIndex]={...rooms[roomIndex],bookingStatus:true}
        let data = req.body;
        data.room_name = rooms[roomIndex].room_name;
        data.bookingStatus = true;
        data.booking_id = booking.length?booking[booking.length-1].booking_id+1:1;
        booking.push(data);
     res.status(200).send({
         message:"Booking Success"
     })
    }else{
        res.status(400).send({
            message:"Sorry... This Room is Already Booked"
        })
     }
    } catch (error) {
         res.status(500).send({
         message:"Internal Server Error"
     })
    }
 }   


//3.List All Rooms With Booked data with 
//      *Room Name 
//      *Booked Status
//      *Customer Name
//      *Date 
//      *Start Time
//      *End Time


const getBookingData = (req,res)=>{
    let bookingData = booking.map((e,i)=>{
        console.log(e.booked_date);
         return{
            RoomName : e.room_name,
            BookedStatus : e.booking_status,
            CustomerName : e.customer_name,
            Date : e.booked_date,
            StartTime : e.start_time,
            EndTime : e.end_time
         }
        
    })
    console.log(bookingData);
try {
    res.status(200).send({
        message:"Booking Data fetched Successfully",
        bookingData
        
    })
    
} catch (error) {
    res.status(500).send({
        message:"Internal Server Error"
    })
}
}

//4.List All Customers With Booked Data With 
//      *Customer Name
//      *Room Name
//      *Date 
//      *Start Time
//      *End Time

const getCustomerData = (req,res)=>{
    let customerData = booking.map((e,i)=>{
        return{
            CustomerName : e.customer_name,
            RoomName : e.room_name,
            Date : e.booked_date,
            StartTime : e.start_time,
            EndTime : e.end_time
         }
    })
    try {
        res.status(200).send({
            message:"Customer Data fetched Successfully",
            customerData
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

//5.List How Many Times a Customer has booked the room with below details 
//      *Customer Name 
//      *Room Name 
//      *Date 
//      *Start Time
//      *End Time
//      *Booking Id   
//      *Booking Date
//      *Booking Status


const getCount = (req,res)=>{
   let customerName = req.params.customer_name;
   let customer = booking.filter((e)=>customerName===e.customer_name) 
   let customerBooking=customer.map((data)=>{
    return{
        CustomerName:data.customer_name,
        RoomName:data.room_name,
        Date : data.booked_date,
        StartTime : data.start_time,
        EndTime : data.end_time,
        BookingId : data.booking_id,
        BookingDate:data.booked_date,
        BookingStatus:data.bookingstatus
    }
   })

   res.status(200).send({
    message:`Customer Data Fetched Successfully.${customerBooking.length} Times he Booked Rooms`,
    customerBooking
   })
}    


export default {
   createRoom,roomBooking,getBookingData,getCustomerData,getCount
}
