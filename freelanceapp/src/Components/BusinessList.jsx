import {useEffect, useState} from 'react';
import axios from 'axios';
const BusinessList = () =>{
  
  const [businessList, setBusinessList] = useState([]);
  
  const getBusinessList = async () => {
    const { data } = await axios.get('http://localhost:8000/admin/businesses');
    setBusinessList(data);
  };

  useEffect(() => {
    getBusinessList();
  }, []);
  

  return(
    <>
    {businessList.map((business,i)=>{    
    return(
      <ul key={i} role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-800 truncate">
                          {business.companyName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {business.contactEmail}
                        </p>
                    </div>

                </div>
            </li>            
     </ul>
    )
        }
      )
    }
    </>
  )
}

export default BusinessList;
