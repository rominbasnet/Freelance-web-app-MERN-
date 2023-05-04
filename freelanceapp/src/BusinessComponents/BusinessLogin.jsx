import '../Components/FreelancerLogin.css';
import axios from 'axios';
import BusinessDashboard from './BusinessDashboard';
import {useRef, useState, useEffect} from 'react';
import {MdEmail, MdLock} from 'react-icons/md'; 
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginBusiness} from '../actions/businessAuthAction';
import {BLogOut} from '../actions/businessAuthAction';

const BusinessLogin = () =>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state)=> state.businessAuthReducer);
  const { authentication, loading, error } = state;
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(()=>{
    dispatch(BLogOut());   
  },[])


  const handleSubmit =  (e)=>{
    e.preventDefault();
    try{
      dispatch(loginBusiness({email, password}))
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
      navigate('/businessdashboard')
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
              <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
                 
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
export default BusinessLogin;
