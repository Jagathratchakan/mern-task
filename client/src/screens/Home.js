import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import { DatePicker, Space } from 'antd';
import { Link } from 'react-router-dom'

const { RangePicker } = DatePicker;
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fromdate, setFromdate] = useState('');
  const [enddate, setEnddate] = useState('');

  const [duplicate, setDuplicate] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = (await axios.get('/api/rooms/getallrooms')).data;
        //console.log(res);
        setRooms([...res.rooms]);
        setDuplicate([...res.rooms]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterbyDate = (dates) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      //console.log('Specific Date:', startDate.format('DD-MM-YYYY'));
      setFromdate(startDate.format('DD-MM-YYYY'));
      setEnddate(endDate.format('DD-MM-YYYY'));

      var temprooms = []
      var avali = true;
      for (const roo of duplicate) {
        if (roo.currentbookings.length > 0
        ) {
          for (const bookin of roo.currentbookings) {
            const bookingStartDate = moment(bookin.fromdate, 'DD-MM-YYYY').valueOf();
            const bookingEndDate = moment(bookin.todate, 'DD-MM-YYYY').valueOf();
            const inputStartDate = startDate.valueOf();
            const inputEndDate = endDate.valueOf();
            //console.log(bookingEndDate);
            if (
              (inputStartDate >= bookingStartDate && inputStartDate <= bookingEndDate) ||
              (inputEndDate >= bookingStartDate && inputEndDate <= bookingEndDate) ||
              (inputStartDate <= bookingStartDate && inputEndDate >= bookingEndDate)
              ) {
              avali = false;
              break;
            }
          }
        }
        if (avali == true || roo.currentbookings.length == 0) {
          temprooms.push(roo)
        }
        setRooms(temprooms)
      }


    } else {
      console.log('No date selected');
    }
  };

  useEffect(() => {
    console.log('From Date:', fromdate);
    console.log('End Date:', enddate);
  }, [fromdate, enddate]);

  return (
    <div className='container'>
      <div className='row mt-5' id="select">
        <div className='col-md-5'>
          <h1>Select the Date for the Room Booking</h1>
        </div>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterbyDate} allowClear />
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <h1>Loading.....</h1>
        ) : error ? (
          <h1>Error</h1>) :
          (rooms.map((room) => (
            <div className='col-md-9 mt-3' key={room._id}>
              <Room
                {...room}
                fromdate={fromdate}
                todate={enddate}
              />
              <div style={{ float: "right" }}>
                {(fromdate && enddate) && (
                  <Link to={`/book/${room._id}/${fromdate}/${enddate}/`}>
                    <button className='btn btn-primary'>Book Now</button>
                  </Link>
                )}
              </div>
            </div>
          ))
          )}
      </div>
    </div>
  );
}

export default Home;
