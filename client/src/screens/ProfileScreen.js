import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import { Divider, Space, Tag } from 'antd';
import Swal from 'sweetalert2'

const { TabPane } = Tabs;

function ProfileScreen() {
    const user = JSON.parse(localStorage.getItem("curId"))


    return (
        <div className='ml-5 mt-5' style={{ marginLeft: '50px' }}>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Profile" key="1">
                    <br />

                    <h1> Name : {user.name}</h1>
                    <h1> Email : {user.email}</h1>
                    <h1> Role : {user.usertype}</h1>
                </TabPane>
                <TabPane tab="Booking" key="2">
                    <MyBooking />
                </TabPane>
                {user.usertype === "owner" && (
                    <TabPane tab="Add Rooms" key="3">
                        <AddRooms />
                    </TabPane>

                )}
                {user.usertype === "owner" && (
                    <TabPane tab="My Rooms" key="4">
                        <DisRoom />
                    </TabPane>

                )}
            </Tabs>,
        </div>
    )
}

export function AddRooms() {
    const user = JSON.parse(localStorage.getItem("curId"))

    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState('')
    const [maxcount, setmaxcount] = useState('')
    const [phonenumber, setphonenumber] = useState('')
    const [maxday, setmaxday] = useState('')
    const [imgurl, setimgurl] = useState('')

    async function addRoom() {
        const user = JSON.parse(localStorage.getItem("curId"));
        const userid = user._id;

        const newroom = {
            name,
            rentperday,
            maxcount,
            phonenumber,
            maxday,
            imgurls: [imgurl],
            userid,
            currentbookings : [],

        }

        try{
            const result = await (await axios.post("/api/rooms/addroom",newroom)).data
            console.log(result)
            Swal.fire('Successfully',' Room Added','success')
            setname('')
            setmaxcount('')
            setimgurl('')
            setphonenumber('')
            setrentperday('')
            setmaxday('')
        }
        catch (error){
            console.log(error)
            Swal.fire('Something went wrong','error')
        }

        console.log(newroom)
    }

    return (
        <div className='row bs'>
            <div className='col-md-5 mt-3'>
                <input type="text" className='form-control mt-3' placeholder='room name'
                    value={name} onChange={(e) => { setname(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='rent per day'
                    value={rentperday} onChange={(e) => { setrentperday(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='max count'
                    value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='phone number'
                    value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}
                />
            </div>
            <div className='col-md-5 mt-3'>
                <input type="text" className='form-control mt-3' placeholder='max days'
                    value={maxday} onChange={(e) => { setmaxday(e.target.value) }}
                />
                <input type="text" className='form-control mt-3' placeholder='image url'
                    value={imgurl} onChange={(e) => { setimgurl(e.target.value) }}
                />

                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
                </div>
            </div>
        </div>
    );
}



export function DisRoom() {

    const user = JSON.parse(localStorage.getItem("curId"));

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/bookings/getroombyuserid", { userid: user._id });
                const fetchedRooms = response.data;
                setRooms(fetchedRooms);
                console.log(fetchedRooms);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchData(); // Call the async function
    }, [user._id]);

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {rooms && (rooms.map(room => {

                        return <div className='bs'>
                            <h1>{room.name}</h1>
                            <p><b>Phone Number</b> : {room.
                                phonenumber
                            }</p>
                            <p><b>Rent per Day</b> : {room.rentperday}</p>
                            <p><b>Max Days</b> : {room.maxday}</p>
                            <button className='btn btn-primary '>
                                Update
                            </button>
                            <button className='btn btn-primary' style={{marginLeft:"20px"}}>
                                Delete
                            </button>
                        </div>

                    }))}
                </div>

            </div>
        </div>
    );

}

export function MyBooking() {
    const user = JSON.parse(localStorage.getItem("curId"));

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/bookings/getbookingsbyuserid", { userid: user._id });
                const fetchedRooms = response.data;
                setRooms(fetchedRooms);
                console.log(fetchedRooms);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchData(); // Call the async function
    }, [user._id]);

    async function cancelBooking(bookingid, roomid) {
        try {
            const res = await (axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {rooms && (rooms.map(room => {

                        return <div className='bs'>
                            <h1>{room.room}</h1>
                            <p><b>Booking id</b> : {room._id}</p>
                            <p><b>CheckIn</b> : {room.fromdate}</p>
                            <p><b>Checkout</b> : {room.todate}</p>
                            <p><b>Amount</b> : {room.amount}</p>
                            <p>
                                <b>Status</b> :
                                {" "}
                                {room.status === 'cancelled' ? <Tag color="red">CANCEL</Tag> : <Tag color="green">CONFIRME</Tag>
                                }
                            </p>

                            {room.status !== 'cancelled' && (
                                <div className='text-right'>
                                    <button className='btn btn-primary' onClick={() => { cancelBooking(room._id, room.roomid) }}>Cancel Booking</button>
                                </div>
                            )
                            }
                        </div>

                    }))}
                </div>

            </div>
        </div>
    );
}

export default ProfileScreen
