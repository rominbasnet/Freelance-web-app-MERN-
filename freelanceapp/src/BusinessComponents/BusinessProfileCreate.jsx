import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBusinessProfile} from '../actions/businessAction';

const BusinessProfileCreate = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [status, setStatus] = useState('');
  const [website, setWebsite] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [established, setEstablished] = useState('')
  const [businessImage,setBusinessImage] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');
  


 
  const handleSubmit= (e) => {
    e.preventDefault();
  const formdata = new FormData();
  formdata.append("status", status);
  formdata.append("website", website);
  formdata.append("employeeCount", employeeCount);
  formdata.append("established", established);
  formdata.append("businessImage", businessImage);
  formdata.append("companyCategory", companyCategory);
  
  dispatch(createBusinessProfile(formdata));      
    //navigate('/businessdashboard')
  }


  return (
<> 
    <div className="bg-gray-900">
  
<div className="flex  bg-gray-900 h-screen items-center justify-center  mt-32 mb-32">
  <div className="grid bg-gray-800 border-gray-750 rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
    <div className="flex justify-center py-4">
      <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
      </div>
    </div>

    <div className="flex justify-center">
      <div className="flex"> 
        <h1 className="text-pink-500 font-bold md:text-2xl text-xl">Create your Profile</h1>
      </div>
    </div>

    <div className="grid grid-cols-1 mt-5 mx-7">
      <label className="uppercase md:text-sm text-xs text-btn_primary text-light font-semibold">Website</label>
      <input  name= "website" value={website} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="" 
      onChange= {(e)=>setWebsite(e.target.value)}/>
    </div>
    
    <div className="grid grid-cols-1 mt-5 mx-7">
      <label className="uppercase md:text-sm text-xs text-btn_primary text-light font-semibold">Website</label>
      <input  name= "website" value={companyCategory} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="" 
      onChange= {(e)=>setCompanyCategory(e.target.value)}/>
    </div>

    <div className="grid grid-cols-1 mt-5 mx-7">
      <label className="uppercase md:text-sm text-xs text-btn_primary text-light font-semibold">Established Date</label>
      <input  value={established} name= "established" className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="number" 
      onChange= {(e)=>setEstablished(e.target.value)}/>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
      <div className="grid grid-cols-1">
        <label className="uppercase md:text-sm text-xs text-btn_primary text-light font-semibold">EmployeeCount</label>
        <input value ={employeeCount} name="employeeCount" className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="number" placeholder="" 
       onChange= {(e)=>setEmployeeCount(e.target.value)}/>
      </div>

    </div>

    <div className="grid grid-cols-1 mt-5 mx-7">
      <label className="uppercase md:text-sm text-xs text-btn_primary text-light font-semibold">Status</label>
      <select value ={status} name="status" className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        onChange= {(e)=>setStatus(e.target.value)} required>
        <option value= ''>Select Status</option>
        <option value= 'Available'>Available</option>
        <option value= 'Not Available'>Not Available</option>
        <option value= 'Not Open To Work'>Not Open To Work</option>
      </select>
    </div>



    <div className="grid grid-cols-1 mt-5 mx-7">
      <label className="uppercase md:text-sm text-xs text-btn_primary text-light font-semibold mb-1">Upload Photo</label>
        <div className='flex items-center justify-center w-full'>
            <label className='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group'>
                <div className='flex flex-col items-center justify-center pt-7'>
                  <svg className="w-10 h-10 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <p className='lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider'>Select a photo</p>
                </div>
              <input onChange={(e)=> setBusinessImage(e.target.files[0])} type="file" name="businessImage" className="hidden" />
            </label>
        </div>
    </div>

    <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
      <button onClick={handleSubmit} className='w-auto bg-green-400 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-12 py-2'>Create</button>
    </div>

  </div>
 </div>

    </div>
</>
  )
}
export default BusinessProfileCreate;
