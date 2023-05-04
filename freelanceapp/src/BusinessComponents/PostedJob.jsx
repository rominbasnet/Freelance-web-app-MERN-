import react from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchJobs} from '../actions/jobAction';
import {useNavigate} from 'react-router-dom';
import TimestampToDate from './TimestampToDate';

const PostedJob = ({
  jobStat,
  jobAssigned,
  jobInProgress,
  jobCompleted
}) => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {jobs} = useSelector((state)=> state.jobReducer);
   const {business} = useSelector((state)=> state.businessAuthReducer);
   const {businessProfile} = useSelector((state)=> state.businessReducer);
   const [visible, setVisible] = useState(false);
   const bool = true;
    useEffect(()=>{
      dispatch(fetchJobs());
    },[dispatch])
   
   const handleClick = (e)=>{
    e.preventDefault();
    setVisible(true);
   }


  if(jobs.length === 0){
    return null;
  }

   return(
    <>
      
        <div>
           {jobs.map((job,i) => job.business._id === business._id 
             ?
             (<div key={i} className="bg-laracast_bg border-gray-750 shadow hover:bg-laracast_hoverbg w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 mb-3 rounded-md">
    <div> 
    <div className = "flex items-center justify-between">
      <span className="text-sm font-mono text-posted_txt"><TimestampToDate date={job.date}/></span>
<div className="ml-auto">
{
  job.status === 'not-assigned' ?  (<span className="border border-green-300 bg-skill_bg font-mono font-bold text-skill_border text-sm rounded-full px-3 py-1 ">
  Not-assigned</span>)
  : 
  (job.status === 'assigned' && (job.workStatus === 'In-Progress' || job.workStatus === 'Completed')) ? ( <span className="border border-green-300 bg-skill_bg font-mono font-bold text-skill_border text-sm rounded-full px-3 py-1 ">
{job.workStatus}</span>)
 : 
   (<span className=" border border-green-300 bg-skill_bg font-mono font-bold text-skill_border text-sm rounded-full px-3 py-1">Assigned</span>)

}
</div>

</div>
      <div className="flex items-center gap-4 mt-4 mb-4">
      <img className="object-cover rounded-full h-14 w-14 border-1" src={`http://localhost:8000/${businessProfile?.businessImage}`} alt="Business Profile" />
      <h3 className="font-bold mt-2  text-gray-300 text-xl">{job.jobTitle}</h3>
      </div>

      <div className="mt-4 mb-6 font-sans  leading-7 text-gray-300">
          {job.jobDescription}
    </div>

    <div className="flex items-center gap-2 mt-2 mb-2">
    {job.skillSetReq?.map((skill)=>{
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
      <span className="bg-green-300 text-gray-900 rounded-full px-3 py-1 font-mono font-bold text-sm">{job.jobBudget}</span>
      <span className="text-slate-600 text-sm text-gray-200 flex gap-1 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white stroke-gray-900 stroke-2" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div className="text-sm font-mono  text-skill_border ">{job.business?.location.charAt(0).toUpperCase() + job.business?.location.slice(1)}</div>
      </span>
    <div className="flex gap-3">

    <button  disabled={job?.interested?.length <= 0} onClick={()=>{
       

      const res =  job.interested.map((arr)=>{
         return arr;
        })
      
        navigate('/testcomponent', {state: {
          res,
          id: job._id,
          freelancerProfile: job.freelancerProfile,
          rated: job.rated,
          workStatus: job.workStatus,

          jobStat: jobStat,
          jobAssigned: jobAssigned,
          jobInProgress: jobInProgress,
          jobCompleted: jobCompleted

          }
        }
        ); 
    }}
    className="bg-sky-200 hover:bg-gray-100 text-gray-900 font-small px-2 py-1 rounded-2xl flex gap-1 items-center">
  
  {job.workStatus === 'In-Progress' || job.workStatus === 'Completed' || job.status === 'assigned' ? 'View Assigned' : 'View Interested' }
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path className= "stroke-gray-900" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>    
    </button>
  
  
  {job.status === 'not-assigned' && (<>
    <button 
      onClick={()=>{ 
        navigate('/recommendcomponent', {state: {
          id: job._id,
          jobStat: jobStat,
          jobAssigned: jobAssigned,
          jobInProgress: jobInProgress,
          jobCompleted: jobCompleted,
        }
        })
      }
      }
      className="bg-sky-200 hover:bg-gray-100 text-gray-900 font-small px-2 py-1 rounded-2xl flex gap-1 items-center">
      View Recommended
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path className= "stroke-gray-900" strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg> 
    </button>
    </>)
  }
    </div>
            { job.status === "not-assigned" && (<>
              <h1 className="text-sm font-mono text-blue-700">{job.interested.length} interested</h1>
            </>
            )
            }
    </div>
    </div>
    </div>

  )
  :
  (
    <>
    </>
  )
  )
   }
        </div>
       </>
   )
}

export default PostedJob;
