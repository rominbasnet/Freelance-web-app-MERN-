import axios from 'axios';

export const AddRating = (id, jobId, rating) => async(dispatch) =>{
  
  try{
    const response = await axios.post(`http://localhost:8000/business/profile/rating/${id}`,
                          JSON.stringify({
                            rating,
                            jobId
                          }),
                        {
                          headers:{
                            'Content-Type':'application/json'
                            }
                        }
        );
  }
  catch(err){
  console.log(err);
  }
}

export const fetchSearchFreelancer = (searchValue) => async (dispatch)=>{

  try{
    const response = await axios.get(`http://localhost:8000/business/searchfreelancer?skill=${searchValue}`);
console.log(response)
    dispatch({
      type: "FETCH_SEARCH_FREELANCER",
      payload: response.data
    })
  }catch(err){
  
    dispatch({
      type: "FETCH_SEARCH_FREELANCER_ERROR",
      payload: {msg: err.response}
    })
  }
}


export const getIndBusinessProfile = () => async(dispatch) =>{
  try{
    const response =  await axios.get('http://localhost:8000/business/profile/individual');
    dispatch({
      type: "REMOVE_BUSINESS_PROFILE",
      
    })
   
    dispatch({
      type: "FETCH_BUSINESS_PROFILE",
      payload: response.data 
    })
  }catch(error){
    dispatch({
      type: "BUSINESSRPROFILE_ERROR",
      payload: {
        message: error.response.statusText 
      }
    })
  }
}


export const createBusinessProfile = (formdata) => async (dispatch) => {

console.log(formdata.get("status"))
                 
    try{
        
        const response = await axios.post('http://localhost:8000/business/createprofile',
         formdata,
        {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
      );
       console.log(response)
        dispatch({
            type: "FETCH_BUSINESS_PROFILE",
            payload: response.data
        });
    }

        catch(err){
          console.log(err)
           dispatch({
               type: "BUSINESSRPROFILE_ERROR",
               payload: {msg: err.response.statusText, status: err.response.status}
           });
        }
    }