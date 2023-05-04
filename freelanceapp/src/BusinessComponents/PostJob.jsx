import react from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addJob} from '../actions/jobAction';



const PostJob = () =>{
  
  const dispatch = useDispatch();
  const { msgsuccessful } = useSelector(state => state.jobReducer);
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobBudget, setJobBudget] = useState('');
  const [jobDuration, setJobDuration] = useState('');
  const [skillSetReq, setSkillSetReq] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  console.log(msgsuccessful)
  console.log(jobTitle)

  const handleSubmit= (e) => {
    e.preventDefault();  
    dispatch(addJob({
      jobDescription,
      jobTitle,
      jobBudget,
      jobDuration,
      skillSetReq
    })
    );      
    
  }


  return(
<form className="max-w-xl mx-auto mt-4">
  <div className="mb-6">
    <label htmlFor="job-title" className="block text-gray-700 font-bold mb-2">Job Title</label>
    <input id="job-title" value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} name="job-title" type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>
  <div className="mb-6">
    <label htmlFor="job-description" className="block text-gray-700 font-bold mb-2">Job Description</label>
    <textarea id="job-description" value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} name="job-description" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
  </div>
  <div className="mb-6">
    <label htmlFor="job-requirements" className="block text-gray-700 font-bold mb-2">Job Skill Requirements</label>
    <textarea id="job-requirements" value={skillSetReq} onChange={(e)=>setSkillSetReq(e.target.value)} name="job-requirements" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
  </div>
  <div className="mb-6">
    <label htmlFor="job-duaration" className="block text-gray-700 font-bold mb-2">Job Duration</label>
    <input id="job-duaration" value={jobDuration} onChange={(e)=>setJobDuration(e.target.value)} name="job-duration" type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div className="mb-6">
    <label htmlFor="job-salary" className="block text-gray-700 font-bold mb-2">Salary Range</label>
    <input id="job-salary" value={jobBudget} onChange={(e)=> setJobBudget(e.target.value)} name="job-salary" type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div className="flex justify-center mt-12">
    <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Post Job</button>
  </div>
</form>
  )
}
export default PostJob;
