import {useEffect, useState} from 'react';
import axios from 'axios';

const BusinessStat = ({jobStat, jobAssigned, jobInProgress, jobCompleted}) =>{
  const [businessList, setBusinessList] = useState([]);
  return(
    <>
  
      <ul  role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              
                   
                    <div className="flex-1 min-w-0">
                        <p className="text-md font-bold text-blue-800 truncate mb-2">
                         Total job posted: {jobStat}
                        </p>
                        <p className="text-md font-bold text-blue-800 truncate mb-2">
                         Total job assigned: {jobAssigned}
                        </p>
                        <p className="text-md font-bold text-blue-800 truncate mb-2">
                         Total job inprogress: {jobInProgress}
                        </p>
                        <p className="text-md font-bold text-blue-800 truncate mb-2">
                         Total job completed: {jobAssigned}
                        </p>

                </div>
            </li>            
     </ul>


    </>
  )
}

export default BusinessStat;
