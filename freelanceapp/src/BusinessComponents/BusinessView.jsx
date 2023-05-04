import {addInterested} from '../actions/jobAction';
import {useDispatch} from 'react-redux';

const BusinessView = ({ id,  freelancer, website, status, githubUsername, skills, student, rating, date, specialization, image}) =>{
  const dispatch = useDispatch();
  const githubUrl = `https://github.com/${githubUsername}`; 
  const linkedinUrl = `https://www.linkedin.com/in/${freelancer.linkedIn}/`;
  const Interested = (e) =>{
    e.preventDefault();
    dispatch(addInterested(id));
  }
  return(
    
<div key={id} className="bg-laracast_bg border-gray-750 shadow hover:bg-laracast_hoverbg w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 mb-3 rounded-md">
    <div>
    <div className="flex justify-between mt-2">
      <span className="text-sm font-mono text-posted_txt">Joined on {date.slice(0,10)}, {freelancer?.email}</span>

    { (rating>0 && rating<5) && (
    <div className="rating rating-sm">
      <input type="radio" name= {`rating-4-${id}`}  className="mask mask-star-2 bg-yellow-500" checked={rating === 1 ? true : false} onChange={()=>{}} />
      <input type="radio" name= {`rating-4-${id}`}   className="mask mask-star-2 bg-yellow-500" checked={rating === 2 ? true : false} onChange={()=>{}} />
      <input type="radio" name= {`rating-4-${id}`}  className="mask mask-star-2 bg-yellow-500" checked={rating === 3 ? true : false} onChange={()=>{}} />
      <input type="radio" name= {`rating-4-${id}`}  className="mask mask-star-2 bg-yellow-500" checked={rating === 4 ? true : false} onChange={()=>{}} />
      <input type="radio" name= {`rating-4-${id}`}  className="mask mask-star-2 bg-yellow-500" checked={rating === 5 ? true : false} onChange={()=>{}} />
    </div>
 )
 }
    </div>
    <div className="flex items-center gap-4 mt-4 mb-7">
      <img className="rounded-full h-12 w-12" src={`http://localhost:8000/${image}`} alt="Freelancer Profile" />
      <h3 className="font-small mt-2  text-gray-200 text-xl">{freelancer?.firstName} {freelancer?.lastName}</h3>
  <span className="border border-green-300 mt-2 font-mono font-bold text-gray-400 text-sm rounded-full px-3 py-1 ">
      {specialization}  
      </span>
    </div> 
   
    
  
    <div className="mt-2 mb-8 font-sans leading-7  font-small text-gray-200">
    skill_border dvcds sacvsagUSCYSVCYVC VCYV csdgvcVCv GVCGDHSVCS hvcgdVV VDSHGVCGSVGDCk
    rgekgjnergnvcdstyvcsvcvsghd SDCFVSAS YVYCSADV YSAVDCYTSAV YSAVDCYTVSADY Y7SADCYTDSAV YSAVDCTVSA YSADVCYVSAD Y6ASDCSV TFDTFWDYWED V234 VTYC
    </div>

    <div className="flex items-center gap-2 mt-2 mb-6">
    {skills?.map((skill, i)=>{
      return(
        <>
              <svg key={i} className="h-6 w-6 flex-none fill-gray-800 stroke-gray-400 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
        <span className="border border-skill_border bg-skill_bg font-mono font-bold text-skill_border text-sm rounded-full px-3 py-1 ">{skill}</span>
        </>
      )})
    }
    </div>
    
    <div className="flex items-center gap-6 mt-6">
      <span className="border border-laracast_mainbg bg-gray-300 flex items-center gap-3 text-sky-100 rounded-full px-3 py-1 text-sm">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">     
          <svg aria-hidden="true" className="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
       <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </span>
      <span className="text-slate-600 text-sm text-gray-200 flex gap-1 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white stroke-gray-900 stroke-2" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div className="text-sm font-mono  text-gray-300 ">{freelancer?.location}</div>
      </span>

    </div>
    </div>
    </div>
    
  )
}
export default BusinessView;
