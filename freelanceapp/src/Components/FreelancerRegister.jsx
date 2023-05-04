import './FreelancerRegister.css';
import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {freelancerRegister} from '../actions/freelancerAuthAction';
import {MdOutlineLock, MdOutlineMailOutline, MdOutlineLocationOn} from 'react-icons/md'; 
import {CiLinkedin} from 'react-icons/ci';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const FreelancerRegister = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state)=> state.freelancerAuthReducer);
  const errRef = useRef();
  const successRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [validName, setValidName] = useState(false)
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);  

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [description, setDescription] = useState("");
  
  useEffect(() => { 
    setValidName(USER_REGEX.test(userName))
     }, [userName])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password))
    setValidMatch(password === confirmPassword) 
  }, [password, confirmPassword])
  // const obj ={userName, firstName, lastName, email, password, confirmPassword, location, age, linkedIn, description}
  // console.log(obj)
    console.log(validName);
    console.log(validPwd); 

  const handleSubmit = async (e)=>{
    e.preventDefault();

        try{
        const response = await axios.post('http://localhost:8000/admin/freelancer',
            JSON.stringify({
              userName,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              linkedIn,
              location,
              age,
              description
            }),
            {
              headers: { 'Content-Type': 'application/json' }
              // withCredentials: true
            }
          );
        setSuccessMsg("Check your email to verify your account")
        setUserName('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLocation('');
        setAge('');
        setLinkedIn('');
        setDescription('');
    
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
  
//   useEffect(() => {
//   if (successMsg) {
//     navigate('/');
//   }
// }, [successMsg]);
  
  return (
   <div className="login-root">
      <div className="box-root flex-flex flex-direction--column">
        <div className="formbg-outer">
          <div className="formbg">
            <div className="formbg-inner padding-horizontal--48">
              <span className="padding-bottom--15">
                <h3 className="modified">Connect With Us</h3>
              </span>
                <p ref={successRef} className={successMsg ? "successmsg" : "offscreen"} aria-live="assertive">{successMsg}</p>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <form id="stripe-login" onSubmit={handleSubmit}>
                <div className="field padding-bottom--24">
                  <input
                  type="text"
                  name="UserName"
                  placeholder="User Name"
                  autoComplete = "off"
                  value= {userName}
                  onChange = {(e)=>setUserName(e.target.value)}
                  required
                  />
                </div>

                <div className="field padding-bottom--24 two-fields">
                  <input 
                  type="text" 
                  name="FirstName" 
                  placeholder="First Name"
                  autoComplete= "off"
                  value= {firstName}
                  onChange = {(e)=>setFirstName(e.target.value)}
                  required
                  />
                  &nbsp;&nbsp;
                  <input 
                  type="text" 
                  name="LastName" 
                  placeholder="Last Name"
                  autoComplete= "off"
                  value= {lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  required
                  />
                </div>

                <div className="field padding-bottom--24">
                  <span className="icon"><MdOutlineMailOutline /></span>
                  <input 
                  type="email" 
                  name="email" 
                  placeholder="Email-Address"
                  autoComplete= "off"
                  value= {email}
                  onChange= {(e)=>setEmail(e.target.value)}
                  required
                  />
  
                </div>
                <div className="field padding-bottom--24 two-fields">
                  <span className="icon"><MdOutlineLock /></span>
                  <input type="password" 
                  name="password" 
                  placeholder="Password"
                  autoComplete= "off"
                  value= {password}
                  onChange= {(e)=>setPassword(e.target.value)}
                  required
                  />
            
                  &nbsp;&nbsp;
                  
                  <input 
                  type="password" 
                  name="Confirmpassword" 
                  placeholder="Confirm Password"
                  autoComplete= "off"
                  value= {confirmPassword}
                  onChange= {(e)=>setConfirmPassword(e.target.value)}
                  required
                  />

                </div>
                <div className="field padding-bottom--24 two-fields">
                
                <input 
                type="number" 
                name="age" 
                placeholder="Age"
                autoComplete= "off"
                value= {age}
                onChange= {(e)=>setAge(e.target.value)}
                />
                  &nbsp;&nbsp;

                <input type="text" 
                  name="location" 
                  placeholder="Mahendra Chowk,Biratnagar"
                  autoComplete= "off"
                  value= {location}
                  onChange= {(e)=>setLocation(e.target.value)}
                  required
                  />


                </div>
                <div className="field padding-bottom--24">
                  <span className="icon"><CiLinkedin /></span>
                  <input 
                  type="text" 
                  name="LinkedIn" 
                  placeholder="Your LinkedIn Username"
                  autoComplete= "off"
                  value= {linkedIn}
                  onChange= {(e)=>setLinkedIn(e.target.value)}
                  required
                  />
                </div>
                <div className="field padding-bottom--24">
                  <textarea
                  type="text"
                  name="LinkedIn" 
                  placeholder="Provide a detailed description about yourself" 
                  autoComplete= "off"
                  value= {description}
                  onChange= {(e)=>setDescription(e.target.value)}
                  required                  
                  />
                </div>
                <div className="field padding-bottom--24">
                  <input type="submit" name="submit" value="Join Us" />
                </div>
              </form>
              <div className="reg">
              Get started... &nbsp;
              Work and Collaborate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}
export default FreelancerRegister;
