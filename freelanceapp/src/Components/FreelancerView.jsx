import {addInterested} from '../actions/jobAction';
import {useDispatch} from 'react-redux';

const FreelancerView = ({ id, date, image, jobTitle, jobDescription, skillSetReq, jobBudget, business, interested}) =>{
  const dispatch = useDispatch();
  
  const Interested = (e) =>{
    e.preventDefault();
    dispatch(addInterested(id));
  }
  return(
    <>
<div className="bg-laracast_bg border-gray-750 shadow hover:bg-laracast_hoverbg w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 mb-3 rounded-md">
    <div>
    <div className = "flex items-center justify-between">
      
      <span className="text-sm font-mono text-posted_txt">Posted on {date.slice(0,10)}, by {business?.contactName}</span>
    
    </div>

    <div className="flex items-center gap-4 mt-4">
    <img className="object-cover rounded-full h-14 w-14 border-1" src={`http://localhost:8000/${image}`} alt="Business Profile" />
    <h3 className="font-bold mt-2  text-gray-300 text-xl">{jobTitle}</h3>
    </div>  
    <div className="mt-4 mb-6 font-medium leading-7  font-medium text-gray-300">
    {jobDescription}
    </div>

    <div className="flex items-center gap-2 mt-2 mb-2">
    {skillSetReq?.map((skill)=>{
      return(
        <>
              <svg className="h-6 w-6 flex-none fill-gray-800 stroke-gray-400 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
        <span className="border border-skill_border bg-skill_bg font-mono font-bold text-skill_border text-sm rounded-full px-3 py-1 ">{skill}</span>
        </>
      )})
    }
    </div>
    
    <div className="flex items-center gap-6 mt-6">
      <span className="border border-laracast_mainbg bg-green-800 text-sky-100 rounded-full px-3 py-1 text-sm">{jobBudget}</span>
      <span className="text-slate-600 text-sm text-gray-200 flex gap-1 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white stroke-gray-900 stroke-2" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div className="text-sm font-mono  text-skill_border ">{business?.location.charAt(0).toUpperCase() + business?.location.slice(1)}</div>
      </span>
    <div>
    <button onClick={Interested} className="bg-sky-200 hover:bg-gray-100 text-gray-900 font-medium px-4 py-2 rounded-2xl flex gap-1 items-center">
      Interested
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path className= "stroke-gray-900" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
    
    </button>
    </div>
    <h1 className="text-sm font-mono text-blue-700">{interested.length} interested</h1>
    </div>
    </div>
    </div>
    </>
  )
}
export default FreelancerView;
