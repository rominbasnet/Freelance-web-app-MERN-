import axios from 'axios';

export const getIndFreelancerProfile = () => async (dispatch) => {
  try{
    const response =  await axios.get('http://localhost:8000/freelancer/profile/individual');
    dispatch({
      type: "REMOVE_FREELANCER_PROFILE",
      
    })
   
    dispatch({
      type: "FETCH_FREELANCER_PROFILE",
      payload: response.data 
    })
  }catch(error){
    dispatch({
      type: "FREELANCERPROFILE_ERROR",
      payload: {
        message: error.response.statusText 
      }
    })
  }
}

export const createFreelancerProfile = (formdata) => async (dispatch) => {
  const obj = {};
  const formdataToKey = (fd) =>{
    for (let key of fd.keys()){
      obj[key] = fd.get(key);
    }
    return obj;
  }
  const newobj = formdataToKey(formdata);

                 
    try{
        
        const response = await axios.post('http://localhost:8000/freelancer/createprofile',
         formdata,
        {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
      );
       
        dispatch({
            type: "FETCH_FREELANCER_PROFILE",
            payload: response.data
        });
    }
        catch(err){
           dispatch({
               type: "FREELANCERPROFILE_ERROR",
               payload: {msg: err.response.statusText, status: err.response.status}
           });
        }
    }

export const  getAllFreelancerProfiles = () => async (dispatch) =>{
  try{
    const response = await axios.get('http://localhost:8000/freelancer/allprofiles');
    dispatch({
      type: "FETCH_ALLFREELANCER_PROFILES",
      payload: response.data  
    })
  }catch(err){
    
    dispatch({
        type: "FREELANCERPROFILE_ERROR",
        payload: {msg: err.response.statusText, status: err.response.status}
    });

  }
}


export const  getFreelancerProfileById = (id) => async (dispatch) =>{
  try{
    const response = await axios.get(`http://localhost:8000/freelancer/profile/${id}`);
    
    dispatch({
      type: "FETCH_FREELANCER_INTERESTED",
      payload: response.data  
    })
  }catch(err){
    
    dispatch({
        type: "FREELANCERPROFILE_ERROR",
        payload: {msg: err.response.statusText, status: err.response.status}
    });

  }
}

export const  getFreelancerProfileByIdRemove = () => async (dispatch) =>{
  try{
    
    dispatch({
      type: "REMOVE_FREELANCER_INTERESTED"
    })
  }catch(err){
    
    dispatch({
        type: "FREELANCERPROFILE_ERROR",
        payload: {msg: err.response.statusText, status: err.response.status}
    });

  }
}


export const addEducation = ({courseOfStudy, university, location, from, to, description}) =>{
          
  return async (dispatch, getState) => {          
            try{                   
                const response = await axios.put('http://localhost:8000/freelancer/profile/education',
                  JSON.stringify({
                    courseOfStudy,
                    university,
                    location,
                    from,
                    to,
                    description 
                  }),
                  {
                  headers: {
                    'Content-Type': 'application/json'
                   }
                  }
                );
               
                dispatch({
                    type: "UPDATE_FREELANCER_PROFILE",
                    payload: response.data
                });
        
                dispatch({
                    type: "FETCH_FREELANCER_PROFILE",
                    payload: response.data
                });
      
        
    
            }catch(err){
                    const errors = await err.response.data.errors;
                   dispatch({
                       type: "FREELANCERPROFILE_ERROR",
                       payload: {msg: err.response.statusText, status: err.response.status}
                   });
                }
      }
}

export const  getAssignedJob = () => async (dispatch) =>{
  try{
    const response = await axios.get('http://localhost:8000/freelancer/profile/individual/assignedjobs');
    
    dispatch({
      type: "FETCH_ASSIGNED_JOBS",
      payload: response.data  
    })
  }catch(err){
    console.log(err); 
   
  }
}

export const statusToInprogress = (jobId) => async (dispatch) => {
  try{
      const response = await axios.put(`http://localhost:8000/freelancer/profile/individual/jobstatustoinprogress/${jobId}`);
      
       }catch(err){
      console.log(err);
  }
}


export const statusToCompleted = (jobId) => async (dispatch) => {
  try{
    const response = await axios.put(`http://localhost:8000/freelancer/profile/individual/jobstatustocompleted/${jobId}`);    
      
    

  }catch(err){
   console.log(err);
  }
}

