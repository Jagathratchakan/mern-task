import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2'

function Booking({match}) {
  const { roomid, fromdate, todate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room,setRoom] = useState([]);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [amount , setAmount] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = (await axios.post('/api/rooms/getroomid', { roomid: roomid })).data;
            // Assuming res.room is an object, not an array
            console.log(res.room.name);
            setRoom(res.room);
            const daysDifference = calculateDaysBetweenDates(fromdate, todate);
            //console.log(daysDifference);
            setNumberOfDays(daysDifference);
            const rentPerDayInteger = parseInt(res.room.rentperday, 10);
            const calculatedTotalAmount = daysDifference * rentPerDayInteger;
            setAmount(calculatedTotalAmount);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError(true);
            setLoading(false);
          }
        };
      
        fetchData();
      }, [roomid]); // Make sure to include roomid as a dependency if it's used in the useEffect

      const calculateDaysBetweenDates = (startDate, endDate) => {
        const start = moment(startDate, 'DD-MM-YYYY', true);
        const end = moment(endDate, 'DD-MM-YYYY', true);
      
        if (start.isValid() && end.isValid()) {
          const daysDifference = end.diff(start, 'days');
          return daysDifference+1;
        } else {
          console.error('Invalid date format');
          return 0; // or handle the error in a way that makes sense for your application
        }
      };

  async function bookRoom(){
    const bookingDetials = {
      room,
      userid:JSON.parse(localStorage.getItem('curId'))._id,
      fromdate,
      todate,
      amount,
      numberOfDays
    }

    try{
      const res = await axios.post('/api/bookings/bookroom',bookingDetials)
      Swal.fire('Successfully',' Room Booked','success')
    }
    catch(error){
      Swal.fire('Something went wrong','error')
    }
  }
      

  return (
    <div className='m-5'>
        {loading ? (<h1>Loading......</h1>):error?(<h1>Error......</h1>):(<div>

            <div className='row justify-content-center mt-5 bs'>

                <div className='col-md-6'>
                    <h1>{room.name}</h1>
                    <img  src={room.imgurls[0]} alt='pr'className='bimg'/>
                </div>

                <div className='col-md-6 detail'>
                <div style={{textAlign:"right"}}>
                    <h1>Booking Detials</h1>
                    <hr/>
                    <b>
                    <p>Name: {JSON.parse(localStorage.getItem('curId')).name}</p>
                    <p>From Date : {fromdate}</p>
                    <p>To Date   : {todate} </p>
                    <p>Max Count  : {room.maxcount}</p>
                    </b>
                    </div>
                    <div style={{textAlign:"right"}}>
                    <h1>Amount</h1>
                    <hr/>
                    <b>
                    <p>Total Days : {numberOfDays}</p>
                    <p> Rent per Day :{room.rentperday} </p>
                    <p>Total Amount : {amount} </p>
                    </b>
                    </div>
                
                <div style={{float:'right'}}>
                    <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
                </div>
                </div>
                
            </div>


        </div>)}
    </div>
  )
}

export default Booking