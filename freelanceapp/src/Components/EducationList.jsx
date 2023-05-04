import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addEducation} from '../actions/freelancerAction';
import {FaUniversity} from 'react-icons/fa';

const EducationList = () => {
  
  const dispatch = useDispatch();

  const [educationInfo, setEducationInfo] = useState({
    courseOfStudy: '',
    university: '',
    location: '',
    from: '',
    to: '',
    description: ''
  })
  
  const { location, from, to, description, university, courseOfStudy} = educationInfo;

  const handleChange = (e) =>{
    setEducationInfo({
    ...educationInfo,
    [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(addEducation({courseOfStudy, university, location, from, to, description}));
  }

  return (  
  <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
  <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
  <section className="bg-cream-lighter p-4 shadow-xl">
  <div className="md:flex">
    <h3 className="md:w-1/3 uppercase tracking-wide text-sm text-red-500  sm:text-lg mb-6 ">ADD EDUCATION</h3>
  </div>
  <form onSubmit = {handleSubmit}>
  <div className="md:flex mb-8">
      <div className="md:w-1/3">
        <legend className="uppercase tracking-wide text-sm text-red-500">Academic Details</legend>
        <p className="text-xs font-light text-red-500">This entire section is required.</p>
      </div>
    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
      <div className="mb-4">
        <label className="block uppercase tracking-wide text-xs text-btn_primary font-bold">Name of University/College</label>
        <input className="w-full shadow-inner p-4 border-0" onChange = {handleChange} type="text" value = {university} name="university" placeholder="Mahendra Morang Adarsha Multiple Campus" />
      </div>
      <div className="mb-4">
          <label className="block uppercase tracking-wide text-charcoal-darker text-xs text-btn_primary  font-bold">Location</label>
          <input className="w-full shadow-inner p-4 border-0" onChange = {handleChange} type="text" value = {location} name="location" placeholder="Roadcess Chowk, Biratnagar" />
      </div>
      <div className="mb-4">
        <label className="block uppercase tracking-wide text-charcoal-darker text-xs text-btn_primary  font-bold">Course Of Study</label>
        <input className="w-full shadow-inner p-4 border-0" onChange = {handleChange} type="text" value = {courseOfStudy} name="courseOfStudy" placeholder="Bachelor in CSIT" />
      </div>
      <div className="md:flex mb-4">
        <div className="md:flex-1 md:pr-3">
            <label className="block uppercase tracking-wide text-charcoal-darker text-xs text-btn_primary  font-bold">From</label>
            <input className="w-full shadow-inner p-4 border-0" onChange = {handleChange} type="text" value = {from} name="from" placeholder="2020" />
          </div>
          <div className="md:flex-1 md:pl-3">
            <label className="block uppercase tracking-wide text-charcoal-darker text-xs text-btn_primary  font-bold">To</label>
            <input className="w-full shadow-inner p-4 border-0" onChange = {handleChange} value = {to} type="text" name="to" placeholder="2024" />
          </div>
        </div>
      </div>
    </div>
    <div className="md:flex mb-6">
        <div className="md:w-1/3">
          <legend className="uppercase tracking-wide text-sm  text-red-500 ">Description</legend>
        </div>
        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
          <textarea name= "description" onChange = {handleChange} value = {description} className="w-full shadow-inner p-4 border-0" placeholder="" rows="6"></textarea>
        </div>
    </div>
      <div className="flex items-center justify-center w-full">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-1/6">
            Submit
          </button>
      </div>
    </form>
  </section>
  </main>
  </div>
  )
}

export default EducationList;
