import './FreelancerLogin.css';
import axios from 'axios';
import FreelancerDashboard from './FreelancerDashboard';
import {useRef, useState, useEffect} from 'react';
import {MdEmail, MdLock} from 'react-icons/md'; 
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginFreelancer} from '../actions/freelancerAuthAction';
import {LogOut} from '../actions/freelancerAuthAction';

const FreelancerLogin = () =>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state)=> state.freelancerAuthReducer);
  console.log(state)
  const { authentication, loading, error} = state;
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(()=>{
    dispatch(LogOut());
  
  },[])

  useEffect(()=>{
    setErrMsg('')
  }, [email, password])
 console.log(error)
    
  const handleSubmit =  (e)=>{
    e.preventDefault();
    try{
      dispatch(loginFreelancer({email, password}))
      setEmail('');
      setPassword('');
      setSuccess(true);

    } catch(err){
      if(!err?.response){
        setErrMsg("No Server Response")
      } else if(err.response?.status === 403) {
        setErrMsg("Invalid Password")
      }else{
        setErrMsg(err.response?.data)
      }
      errRef.current.focus();
    }
  }
   if(authentication && success){ 
      navigate('/freelancerdashboard')
    }
  return (
  <>

      <div className="login-root">
      <div className="box-root flex-flex flex-direction--column">
        <div className="formbg-outer">
          <div className="formbg-login">
            <div className="formbg-inner padding-horizontal--48-login">
              <span className="padding-bottom--15-login">
                Welcome back
              </span>
              <p ref={errRef} className= {error? "errmsg" : "offscreen"} aria-live= "assertive">{error}</p>                 
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
              <div className="reg">
              Just getting started? &nbsp;
              Create an account
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>


    </>
  )
}
export default FreelancerLogin;
