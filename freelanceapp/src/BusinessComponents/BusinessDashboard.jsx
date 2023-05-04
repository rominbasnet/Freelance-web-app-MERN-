import FreelancerProfileCreate from '../Components/FreelancerProfileCreate';
import FreelancerView from '../Components/FreelancerView.jsx';
import FreelancerProfileView from '../Components/FreelancerProfileView.jsx';
import FreelancersProfileView from '../Components/FreelancersProfileView.jsx';
import FreelancerProfileEdit from '../Components/FreelancerProfileEdit.jsx'; 
import Test from '../Components/test.jsx';
import BusinessList from '../Components/BusinessList.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchFreelancer, getIndBusinessProfile} from '../actions/businessAction';
import {fetchJobs, fetchSearchJob} from '../actions/jobAction';
import {getIndFreelancerProfile, getAllFreelancerProfiles} from '../actions/freelancerAction';
import {BLogOut} from '../actions/businessAuthAction';
import {loadBusiness} from '../actions/businessAuthAction';
import FreelancerDivContent from '../Components/FreelancerDivContent';
import BusinessDivContent from './BusinessDivContent';
import BusinessProfileCreate from './BusinessProfileCreate';
import PostJob from './PostJob';
import PostedJob from './PostedJob';
import BusinessView from './BusinessView';
import BusinessStat from './BusinessStat';

const BusinessDashboard = () => {

  
  const dispatch = useDispatch();
  const {jobs, searchJob} = useSelector((state) => state.jobReducer);
  const {freelancerProfile} = useSelector((state) => state.freelancerReducer);
  const {searchFreelancer, businessProfile} = useSelector((state) => state.businessReducer);
  const {business} = useSelector((state)=> state.businessAuthReducer);
  const navigate = useNavigate();

  const [jobStat, setJobStat] = useState('');
  const [jobAssigned, setJobAssigned] = useState('');
  const [jobInProgress, setJobInProgress] = useState('');
  const [jobCompleted, setJobCompleted] = useState('');
  
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showFreelancersDiv, setShowFreelancersDiv] = useState(false);

 useEffect(() => {
    dispatch(loadBusiness());
    jobstat();
  },[dispatch, jobs])

 // useEffect(()=>{
//yaha problem huna sakxa 
 //    jobstat();
 //  },[jobs])

  useEffect(() => {
    dispatch(getIndBusinessProfile());
  },[dispatch])



 const jobstat = async()=>{
try{
    const response = await axios.get('http://localhost:8000/job/getjobs');
    const newjobs  = response.data;

     const indjobs = newjobs.filter((job,i) => job?.business?._id === business?._id);
     const joblength = indjobs.length;

     const statusAssigned = indjobs.filter(job => job.status === "assigned");
     const assignedlength = statusAssigned.length;

     const statusInprogress = indjobs.filter(job => job.workStatus === "In-Progress");
     const inprogresslength = statusInprogress.length;
     
     const statusCompleted = indjobs.filter(job => job.workStatus === "Completed");
     const completedlength = statusCompleted.length;

     setJobStat(joblength);
     setJobAssigned(assignedlength);
     setJobInProgress(inprogresslength);
     setJobCompleted(completedlength);

  }catch(err){
    console.log(err)
  }
}

 
  const handlePostJob = (e) =>{
    e.preventDefault();
    navigate("/newpostjob")
  }
  
  const handleOpenFreelancersProfile = (e) =>{
    e.preventDefault();
    setShowFreelancersDiv(true);
  }

const handleOpenDashboard = (e) =>{
    e.preventDefault();
    setShowFreelancersDiv(false);
  }
  
  const handleShowProfileModal = (e) =>{
    e.preventDefault();
    setShowProfileModal(true);
  }
  
  const handleOnClose = (e) =>{
    setShowProfileModal(false);
  }

  const handleSearch = (e) =>{
    dispatch(fetchSearchFreelancer(searchValue));
  }
  const handleMapClick = (e) =>{
    e.preventDefault();
    navigate('/business/map');
  }
  
  const handleLogOut = (e) =>{
    e.preventDefault();
    dispatch(BLogOut());
    navigate("/");   
  }

  // <img className="object-cover rounded-full h-36 w-36 mx-auto m-1 p-1 border-4 border-sky-500" src={`http://localhost:8000/${businessProfile?.businessImage}`} alt="Business Profile" />



  if(businessProfile === null){
    return(
      <BusinessProfileCreate />
    )
  }

  return(
  <>
    
    <div className="border border-gray-800 bg-laracast_mainbg items-center pt-2">
    
    <form className="mx-32 my-3 bg-gray-900 flex gap-4 rounded-full">

      <input type="search" value= {searchValue} onChange={(e)=> setSearchValue(e.target.value)} className="w-full px-24 py-1 text-base rounded-full font-normal text-gray-900 bg-laracast_hoverbg rounded transition ease-in-out m-0 focus:text-black focus:bg-gray-100 focus:border-black focus:outline-none" placeholder="Type your language requirements here..." aria-label="Search" aria-describedby="button-addon3" />
      <button onClick={handleSearch} className="btn block px-6 py-2.5 bg-laracast_hoverbg text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="white" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </form>
  </div>

  <div className= "flex border border-gray-900 bg-laracast_mainbg flex-col-3 space-x-0  gap-4">
    <div className="w-42 pt-6">
    
   <div className=" w-40 h-42 mt-0 pl-0 py-2 bg-laracast_bg  rounded-lg overflow-y-auto border-0 border-red-500">
      <ul className="space-y-2">
         <li>
            <button onClick={handleOpenDashboard}className="flex items-center p-2 font-light text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="w-6 h-6 fill-blue-600 stroke-gray-300 text-gray-100 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3 text-lg text-gray-100">Dashboard</span>
            </button>
         </li>
         <li>
            <button onClick={handlePostJob} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0  fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
               <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
               <span className="flex-1 ml-3 text-lg text-gray-100 whitespace-nowrap">Post Job  </span>
            </button>
         </li>
         <li>
            <button onClick={handleOpenFreelancersProfile} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
               <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Posted Job </span>
            </button>
         </li>
         <li>
            <button onClick={handleShowProfileModal} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
               <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Your Profile</span>
           
            </button>
         </li>
          <li>
            <button onClick={handleMapClick} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
               <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Near You</span>
           
            </button>
         </li>
        <li>
            <button onClick={handleLogOut} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
               <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Log Out</span>
            </button>
         </li>
      </ul>
   </div>
    </div>
<div className=" w-8/12 rounded-lg items-center justify-center overflow-hidden mb-2 py-1 pl-4 pr-4  sm:py-12">

      {
        (searchFreelancer.length >0 && searchValue) ?
        (
          <>
         
            {
              searchFreelancer.map((profile,i)=>{
              return <BusinessView 
              key={i}
              id={profile._id}
              freelancer={profile.freelancer}
              website={profile.website}
              status={profile.status}
              githubUsername={profile.githubUsername}
              skills={profile.skills}
              rating={profile.rating}
              specialization={profile.specialization}
              image={profile.image}
              student={profile.student}
              date={profile.date}
          />
                })
            }
           
          </>
        ) : showFreelancersDiv
        ?
        (
          <PostedJob 
            jobStat={jobStat}
            jobAssigned={jobAssigned}
            jobInProgess={jobInProgress}
            jobCompleted={jobCompleted}
          />
        )
        :
        (
          <BusinessDivContent />
        )
      }

</div>


<div className="bg-laracast_bg  mt-12 w-60 h-1/2 rounded-md ">
  
<div className="max-w-2xl mx-auto">

  <div className="pl-0 w-42  rounded-lg  shadow-md sm:p-8">
    <div className="flex gap-3 items-center mb-0">
    <img className="object-cover rounded-full h-16 w-16 mx-0 m-1 p-1 border-4 border-sky-500" src={`http://localhost:8000/${businessProfile?.businessImage}`} alt="Business Profile" />
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-red-500">Your Stats</h3>
    </div>
        <BusinessStat jobStat={jobStat} jobAssigned={jobAssigned} jobInProgress={jobInProgress} jobCompleted={jobCompleted} />
      </div>
    </div>  
  </div>






{/*    <div className=" w-8/12 rounded-lg items-center justify-center overflow-hidden  py-2 pl-4 pr-4  sm:py-12">
    {showFreelancersDiv? <PostedJob /> : <BusinessDivContent />}
    </div>*/}
  </div>
    </>
  )
}

export default BusinessDashboard;
