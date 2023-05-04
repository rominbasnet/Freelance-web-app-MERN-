import axios from 'axios';
import qs from 'qs';

export const fetchJobs = () => async (dispatch)=>{
  try{
    const response = await axios.get('http://localhost:8000/job/getjobs');
    dispatch({
      type: "FETCH_JOBS",
      payload: response.data
    })
  }catch(err){
    dispatch({
      type: "FETCH_JOBS_ERROR",
      payload: {msg: err.response.data.errors}
    })
  }
}


export const fetchAllJobs = () => async (dispatch)=>{
  try{
    const response = await axios.get('http://localhost:8000/adminmanage/getalljobs');
    
    dispatch({
      type: "FETCH_JOBS",
      payload: response.data
    })
  }catch(err){
    dispatch({
      type: "FETCH_JOBS_ERROR",
      payload: {msg: err.response.data.errors}
    })
  }
}

export const addJob = ({jobTitle, jobDescription, jobBudget, jobDuration, skillSetReq})=> async dispatch =>{
         
          try{
            const responses = await axios.post('http://localhost:8000/job/createjob',
                          JSON.stringify({
                            jobTitle,
                            jobDescription,
                            jobBudget,
                            jobDuration,
                            skillSetReq
                          }),
                        {
                          headers:{
                            'Content-Type':'application/json'
                            }
                        }
        );
           
          const responsess = await axios.get('http://localhost:8000/job/getjobs');
          dispatch({
            type: "FETCH_JOBS",
            payload: responsess.data 
          })
          dispatch({
            type: "FETCH_ADD_JOB",
            payload: responses.data 
          })
        }
  catch(err){
     dispatch({
      type: "FETCH_JOBS_ERROR",
      payload: err.response
    })


  }
} 


export const fetchSearchJob = (searchValue) => async (dispatch)=>{
  console.log(searchValue)
  try{
    const response = await axios.get(`http://localhost:8000/job/searchjobs?skill=${searchValue}`);

    dispatch({
      type: "FETCH_SEARCH_JOB",
      payload: response.data
    })
  }catch(err){
    dispatch({
      type: "FETCH_JOBS_ERROR",
      payload: {msg: err.response}
    })
  }
}

export const addInterested = (_id) => async (dispatch) => {
  try{
    const response = await axios.put(`http://localhost:8000/job/interested/${_id}`);
    
    dispatch({
      type: "FETCH_UPDATE_INTERESTED",
      payload: {
        interested: response.data,
        _id: _id
      }
    });
    
    const nextResponse = await axios.get('http://localhost:8000/job/getjobs');
    dispatch({
      type: "FETCH_JOBS",
      payload: nextResponse.data
    })



  }catch(err){
    dispatch({
      type: "FETCH_JOBS_ERROR",
      payload: {msg: err.response.data.errors}
    })

  }
}


export const addAssigned = (jobId, id) => async (dispatch) => {
  try{
    const response = await axios.put(`http://localhost:8000/job/assign/${jobId}`,
      
      JSON.stringify({
        freelancerProfileId: id
      }),

      {
        headers:{
            'Content-Type':'application/json'
          }
      }

    );
    
    
   // const nextResponse = await axios.get('http://localhost:8000/job/getjobs');
    //dispatch({
      //type: "FETCH_JOBS",
      //payload: nextResponse.data
    //})



  }catch(err){
    console.log(err);
  }
}

