import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {statusToInprogress, statusToCompleted} from '../actions/freelancerAction';
const FreelancerJobAssignedView = ({ id, date, jobTitle, jobDescription, skillSetReq, jobBudget, business, status, workStatus}) =>{
   
   const { assignedJobs} = useSelector((state) => state.freelancerReducer);
   const dispatch = useDispatch();

   const [isInProgress, setisInprogress] = useState(false);
   const [isCompleted, setisCompleted] = useState(false);
  
   const jobInProgressHandle = (e) =>{
     e.preventDefault();
     dispatch(statusToInprogress(id));
     setisInprogress(true);
   }
  const jobCompletedHandle = (e) =>{
     e.preventDefault();
     dispatch(statusToCompleted(id));
     setisCompleted(true);
   }
 

  const classesProgress = isInProgress || (workStatus === 'In-Progress' && workStatus !== 'Completed') ? 'bg-sky-400 text-gray-800' : 'bg-green-300 text-gray-900';
  const classesCompleted = isCompleted || (workStatus === 'Completed' && workStatus !== 'In-Progress') ? 'bg-sky-400 text-gray-800' : 'bg-green-300 text-gray-900';


  return(
    <>
<div className="bg-laracast_bg border-gray-750 shadow hover:bg-laracast_hoverbg w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 mb-3 rounded-md">
    <div>
      <span className="text-sm font-mono text-posted_txt">Posted on {date.slice(0,10)}, by {business?.contactName}</span>

      <h3 className="font-bold mt-2  text-gray-300 text-xl">{jobTitle}</h3>
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
     
      <button className={`${classesProgress} rounded-full px-3 py-1 font-mono font-bold text-sm`}  onClick={jobInProgressHandle}>
          
        In-progress
      </button> 
     
      <button className={`${classesCompleted} rounded-full px-3 py-1 font-mono font-bold text-sm`}  onClick={jobCompletedHandle}>
        Completed
      </button> 

    <div>
    
    </div>
    </div>
    </div>
    </div>
    </>
  )
}
export default FreelancerJobAssignedView;
