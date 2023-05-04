import react from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addJob} from '../actions/jobAction';

const NewPostJob = () =>{

  const dispatch = useDispatch();
  const { errors, success } = useSelector(state => state.jobReducer);

  const [jobMessage, setJobMessage] = 'Job is posted successfully';
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobBudget, setJobBudget] = useState('');
  const [jobDuration, setJobDuration] = useState('');
  const [skillSetReq, setSkillSetReq] = useState('');
  const [jobCategory, setJobCategory] = useState('');

  const successalert = document.getElementById('success-alert');
  const errorsalert =  document.getElementById('errors-alert');





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
    <>

<form>

  <div className="bg-laracast_mainbg pl-40 pr-40">
    <div className="border-b border-gray-900/10 pb-12 pl-10 pt-5 pr-10">
      

      <h2 className="text-skill_border text-base font-semibold leading-7 ">Profile for the job</h2>
      <p className="mt-1 text-sm leading-6 text-green-200">This information will be displayed publicly to freelancers so be careful what you share.</p>

      <div className="mt-15 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="mt-8 sm:col-span-4">
          <label htmlFor="username" className="block text-base font-lg leading-6 text-blue-300">Job Title</label>
          <p className="mt-1 text-sm leading-6 text-green-200">Provide a title for the job you want to post</p>
          <div className="mt-6">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-blue-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Looking for a</span>
              <input type="text" value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} name="jobTitle" id="jobtitle" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-green-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="developer to build a web-app for my business" required/>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="Job Description" className="block text-base font-lg leading-6 text-blue-300">Job Description</label>
          <p className="mt-2 text-sm leading-6 text-green-200">Provide an elaborate job details to the freelancer</p>
          <div className="mt-4">
            <textarea id="about" value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} name="jobDescription" rows="3" className="pl-2 block w-full rounded-md border-0 py-1.5 bg-transparent text-green-300 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" placeholder="We are looking for a flutter developer for building our ......" required>
              
            </textarea>
          </div>
    
        </div>
        
        <div className="col-span-full">
          <label htmlFor="about" className="block text-base font-lg leading-6 text-blue-300">Job Skill Requirements</label>
          <p className="mt-2 text-sm leading-6 text-green-200">Provide a list of skills required for the job</p>
          <div className="mt-4">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-blue-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Type skills seperated by commas:</span>
              <input type="text" value={skillSetReq} onChange={(e)=>setSkillSetReq(e.target.value)} name="skills" id="skills" autoComplete="skills" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-green-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="html, javscript, nodejs, nginx" required/>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="about" className="block text-base font-lg leading-6 text-blue-300">Job Duration</label>
          <p className="mt-2 text-sm leading-6 text-green-200">Provide your expected duration for the job</p>
          <div className="mt-4">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-blue-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-10 text-gray-500 sm:text-sm">Mention number of days:</span>
              <input type="number" value={jobDuration} onChange={(e)=>setJobDuration(e.target.value)} name="jobDuration" id="jobduration" autoComplete="jobduration" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-green-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="15" required/>
            </div>
          </div>
        </div>


        <div className="col-span-full">
          <label htmlFor="about" className="block text-base font-lg leading-6 text-blue-300">Job Budget</label>
          <p className="mt-2 text-sm leading-6 text-green-200">Provide your expected budget for the job</p>
          <div className="mt-4">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-blue-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-10 text-gray-500 sm:text-sm">Mention job amount:</span>
              <input type="number" value={jobBudget} onChange={(e)=> setJobBudget(e.target.value)} name="jobBudget" id="jobbudget" autoComplete="jobbudget" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-green-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="10000"/>
            </div>
          </div>
        </div>
      </div>

</div>

 {success && (<div id="success-alert" className="mx-auto w-1/2 rounded-md bg-green-300 border-t border-b border-blue-500 text-blue-700 px-4 py-3 opacity-100 transition-opacity duration-500" role="alert">
        <p className=" ml-8 font-bold">Job posted successfully</p>
        <p className="text-sm">Check all the job details and repost the job.</p>
      </div>
      )
}

 {errors && (<div id="errors-alert" className="mx-auto w-1/2 rounded-md bg-green-300 border-t border-b border-blue-500 text-blue-700 px-4 py-3 opacity-100 transition-opacity duration-500" role="alert">
        <p className=" ml-8 font-bold">There was some error</p>
        <p className="text-sm">Check all the job details and repost the job.</p>
      </div>
      )
}

  <div className="pb-4 mt-3 flex justify-center items-center">
    <button type="submit"  onClick={handleSubmit} className="rounded-md bg-green-400  py-2 pl-8 pr-8 text-medium font-semibold text-gray-800 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Post Job</button>
  </div>





  </div>
</form>

</>
)
}

export default NewPostJob;