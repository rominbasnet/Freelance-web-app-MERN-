import '../Components/FreelancerLogin.css';
import axios from 'axios';

import {useRef, useState, useEffect} from 'react';
import {MdEmail, MdLock} from 'react-icons/md'; 
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginFreelancer} from '../actions/freelancerAuthAction';
import {LogOut} from '../actions/freelancerAuthAction';

const AdminLogin = () =>{

  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();
  const [authentication, loading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  

  useEffect(()=>{
    setErrMsg('')
  }, [email, password])
 
    
  const handleSubmit =  async (e)=>{
    e.preventDefault();
        try{
        const response = await axios.post('http://localhost:8000/adminmanage/login',
            JSON.stringify({
              email,
              password 
            }),
            {
              headers: { 'Content-Type': 'application/json' }
              // withCredentials: true
            }
          )
        console.log(response)
        setIsAdmin(response?.data?.isAdmin);
        setEmail('');
        setPassword('');
    
    }
    catch(err){
        console.log(err)
                    if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email already registered');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        
    }

  }

     if(isAdmin){ 
      navigate('/protected/admin/admindashboard')
    }
  return (
  <>

      <div className="login-root">
      <div className="box-root flex-flex flex-direction--column">
        <div className="formbg-outer">
          <div className="formbg-login">
            <div className="formbg-inner padding-horizontal--48-login">
              <span className="padding-bottom--15-login">
                Welcome Admin
              </span>
              <p ref={errRef} className= {errMsg ? "errmsg" : "offscreen"} aria-live= "assertive">{errMsg}</p>                 
              <form id="stripe-login" onSubmit={handleSubmit}>
                <div className="field padding-bottom--24">
                  <span className="icon"><MdEmail /></span>
                  <input 
                      type="email"
                      name="email"
                      ref={emailRef}
                      autoComplete= "off"
                      onChange = {(e)=>setEmail(e.target.value)}
                      value={email}
                      placeholder="Email-Address"
                      required />
                </div>
                <div className="field padding-bottom--24">
                  <span className="icon"><MdLock /></span>
                  <input
                      type="password"
                      name="password"
                      autoComplete= "off"
                      value= {password}
                      onChange= {(e)=> setPassword(e.target.value)}
                      placeholder="Password"
                      required />
                </div>
   
                <div className="field padding-bottom--24">
                  <input type="submit" name="submit" value="Log in to your account" />
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
     </div>


    </>
  )
}
export default AdminLogin;
