import React ,{useState, useEffect}from 'react'
import axios from 'axios';
import Success from '../components/Success';

function Register() {
    const[name,setName] = useState('')
    const[email,setemail] = useState('')
    const[phone,setphone] = useState('')
    const[pass,setPass] = useState('')
    const [userType, setUserType] = useState('');

    const [success, setSuccess] = useState(false);

    async function reg(){
        const user = {
            name,
            email,
            phone,
            pass,
            userType
        }
        try{
            const res = await axios.post('/api/users/register',user).data
            setSuccess(true)

            setName('')
            setPass('')
            setemail('')
            setphone('')
            setUserType('')

        }
        catch(error){
            console.log("error");
        }
        //console.log(user)
    }
  return (
    <div>
        <div className='row justify-content-center mt-5'>

            <div className='col-md-5'>
            {success && (<Success message='Registration Success'/>)}
                <div className='bs'>
                    <h2>Register</h2>
                    <input type="text" id='input' className='form-control mt-1' placeholder='Name'
                    value={name} onChange={(e) =>{setName(e.target.value)}}/>
                    <input type="email" id='input' className='form-control mt-1' placeholder='Email'
                     value={email} onChange={(e) =>{setemail(e.target.value)}}/>
                    <input type="Integer" id='input' className='form-control mt-1' placeholder='Phone Number'
                     value={phone} onChange={(e) =>{setphone(e.target.value)}}/>
                    <input type="text" id='input' className='form-control mt-1' placeholder='Password'
                     value={pass} onChange={(e) =>{setPass(e.target.value)}}/>
                     <select id='input'
              className='form-control mt-1'
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
              }}
            >
              <option value=''>Select User Type</option>
              <option value='owner'>Owner</option>
              <option value='client'>Client</option>
            </select>

                     <button className='btn btn-primary mt-2' onClick={reg}>
                        Register 
                     </button>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Register