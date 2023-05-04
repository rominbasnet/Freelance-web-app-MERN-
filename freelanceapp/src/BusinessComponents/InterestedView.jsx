import {useState} from 'react';
import {addAssigned} from '../actions/jobAction';
import {useDispatch} from 'react-redux';
import MailLink from './MailLink';
const InterestedView = ({ id,  freelancer, website, status, githubUsername, email, skills, student, date, jobId, rating, specialization, image}) =>{
  const dispatch = useDispatch();
  const githubUrl = `https://github.com/${githubUsername}`; 

    
  return(
    
<div key={id} className="bg-laracast_bg border-gray-750 shadow hover:bg-laracast_hoverbg w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 mb-3 rounded-md">
    <div>
    <div className="flex justify-between">
      <span className="text-sm font-mono text-posted_txt">Joined on {date?.slice(0,10)}, {freelancer?.email}</span>
    { (rating>0 && rating<=5) && (
    <div className="rating rating-sm">
      <input type="radio" name="rating-4"  value="9" className="mask mask-star-2 bg-yellow-500 hidden" />
      <input type="radio" name="rating-4"  value="1" className="mask mask-star-2 bg-yellow-500" checked={rating === 1 ? true : false} />
      <input type="radio" name="rating-4"  value="2" className="mask mask-star-2 bg-yellow-500" checked={rating === 2 ? true : false} />
      <input type="radio" name="rating-4"  value="3" className="mask mask-star-2 bg-yellow-500" checked={rating === 3 ? true : false} />
      <input type="radio" name="rating-4"  value="4" className="mask mask-star-2 bg-yellow-500" checked={rating === 4 ? true : false} />
      <input type="radio" name="rating-4"  value="5" className="mask mask-star-2 bg-yellow-500" checked={rating === 5 ? true : false} />
    </div>
    )
    }

    </div>
    <div className="flex items-center gap-4 mt-4">
      <img className="rounded-full h-12 w-12" src={`http://localhost:8000/${image}`} alt="Freelancer Profile" />
      <h3 className="font-small mt-2  text-gray-200 text-xl">{freelancer?.firstName} {freelancer?.lastName}</h3>
<span className="border border-green-300 mt-2 font-mono font-bold text-gray-400 text-sm rounded-full px-3 py-1 ">
      {specialization}  
      </span>
      </div>
      <div className="mt-4 mb-6 font-sans leading-7  font-small text-gray-200">
    dvcds sacvsagUSCYSVCYVC VCYV csdgvcVCv GVCGDHSVCS hvcgdVV VDSHGVCGSVGDCk
    rgekgjnergnvcdstyvcsvcvsghd SDCFVSAS YVYCSADV YSAVDCYTSAV YSAVDCYTVSADY Y7SADCYTDSAV YSAVDCTVSA YSADVCYVSAD Y6ASDCSV TFDTFWDYWED V234 VTYC
    {freelancer?.description}</div>

    <div className="flex items-center gap-2 mt-2 mb-2">
    {skills?.map((skill, i)=>{
      return(
        <>
              <svg key={i} className="h-6 w-6 flex-none fill-gray-800 stroke-gray-400 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
        <span className="border border-skill_border bg-skill_bg font-mono font-bold text-skill_border text-sm rounded-full px-3 py-1 ">{skill}</span>
        </>
      )})
    }
    </div>
    
    <div className="flex items-center gap-6 mt-6">
      <span className="border border-laracast_mainbg bg-green-800 text-sky-100 rounded-full px-3 py-1 text-sm">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">View on Github</a>
      </span>
      
      <span className="text-slate-600 text-sm text-gray-200 flex gap-1 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white stroke-gray-900 stroke-2" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div className="text-sm font-mono  text-skill_border ">{freelancer?.location}</div>
      </span>
      
      <span className="bg-green-300 text-gray-900 rounded-full px-3 py-1 font-mono font-bold text-sm ">
          <button onClick={(e)=>{
               e.preventDefault();
              dispatch(addAssigned(jobId, id));
          }}>
            Assign Job
          </button> 
      </span>
     <span className="bg-green-300 text-gray-900 rounded-full px-3 py-1 font-mono font-bold text-sm ">
          <MailLink email={freelancer?.email} subject={'DevGigs'} body={'Since you have shown interest in the job that we have posted, would you like to join us?'}>
            Click to send Mail
          </MailLink>
      </span>



    </div>
    </div>
    </div>
    
  )
}
export default InterestedView;
