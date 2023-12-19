import React ,{useState, useEffect}from 'react'
import axios from 'axios';
import Error from '../components/Error';
import Success from '../components/Success';
function Loginscreen() {
    const[email,setemail] = useState('')
    const[password,setPass] = useState('')
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

  async  function Login(){
      const user={
        email,
        password
      }
      try{
        const res = (await axios.post('/api/users/login',user)).data
        if(res.email){
          localStorage.setItem('curId',JSON.stringify(res));
          window.location.href = '/home'
        }
        else if (res.message){
          setError(true)
        }
      }
      catch(error){
        console.log("Catch block");
        setError(true)
      }

    }

  return (
    <div>
        <div className='row justify-content-center mt-5'>

            <div className='col-md-5'>
              {error && (<Error message='Invalid User' />)}
                <div className='bs'>
                    <h2>Login</h2>
                    
                    <input type="email" id='input' className='form-control mt-1' placeholder='Email'
                     value={email} onChange={(e) =>{setemail(e.target.value)}}/>
                    <input type="text" id='input' className='form-control mt-1' placeholder='Password'
                     value={password} onChange={(e) =>{setPass(e.target.value)}}/>
                    

                     <button className='btn btn-primary mt-2' onClick={Login} >
                        Log In 
                     </button>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Loginscreen