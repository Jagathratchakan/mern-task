import React from 'react'
import {Link} from 'react-router-dom'

function Room(room, fromdate, todate) {
  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img  src={room.imgurls[0]} alt='pr'className='img'/>
      </div>
      <div className='col-md-7 text-left'>
        <h1>{room.name}</h1>
        <b>
        <p>MAX COUNT: {room.maxcount}</p>
        <p>Phone No : {room.phonenumber}</p>
        <p>Max Days : {room.maxday}</p>
        </b>

      </div>

    </div>
  )
}

export default Room