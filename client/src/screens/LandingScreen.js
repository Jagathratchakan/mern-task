import React from 'react'
import { Link } from 'react-router-dom'

function LandingScreen() {
  return (
    <div className='row landing'>

        <div className='col-md-12 text-center'>
            <h2 style={{color:"white" , fontSize:'120px'}}>Room Rent</h2>
            <h1 style={{color:'white'}}>Service to others is the rent you pay for your room here on earth.</h1>

            <Link to='/home'>
                <button className='btn landingbtn'>Get Start</button>
            </Link>
        </div>

    </div>
  )
}

export default LandingScreen