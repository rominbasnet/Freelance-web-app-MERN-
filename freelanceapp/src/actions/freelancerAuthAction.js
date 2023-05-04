import axios from 'axios';
import freelancerAuthToken from '../utilities/freelancerAuthToken';

export const loadFreelancer = () => async dispatch =>{
	if(localStorage.token){
		freelancerAuthToken(localStorage.token);
	}
	try{
		const response = await axios.get('http://localhost:8000/freelancer/auth')
    if(response?.data?.userName ){
      dispatch({
		    type: "USER_AUTHENTICATED",
		    payload: response.data
	    })
    }
	}
	catch(err){
		dispatch({
			type: "AUTHENTICATION_ERROR"
		})
	}
}


export const freelancerRegister = ({
	userName, 
	firstName, 
	lastName, 
	email, 
	password, 
    confirmPassword, 
    linkedIn,  
    location, 
    age, 
    description
}) => async (dispatch) => {

        try{
           const response = await axios.post('http://localhost:8000/admin/freelancer',
           	            JSON.stringify({
                    			userName,
                    			firstName,
                    			lastName,
                    			email,
                    			password,
                    			confirmPassword,
                    			linkedIn,
                    			location,
                    			age,
                    			description
                  			}),
           					{
                  				headers: {
                    			'Content-Type': 'application/json'
                   				}
                  			}
           					);
           console.log(response.data)
           dispatch({
                type: "SIGNUP_SUCCESS",
                payload: response.data 
           });


        }
       catch(err){
        dispatch({
            type: "SIGNUP_FAIL"
       });
      }
}

export const loginFreelancer = ({
	email,
	password
	}) => async (dispatch) => {
        try{
            const response = await axios.post('http://localhost:8000/freelancer/login',
             					JSON.stringify({
                    			email,
                    			password
                  			}),
             				    {
                  				headers: {
                    			'Content-Type': 'application/json'
                   				}
                  			}
             				);
          
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data 
            });

            dispatch(loadFreelancer());
            
        }
        catch(err){
            console.log(err);
            dispatch({
              type: "LOGIN_FAIL",
              payload: err.response.data.message
           });
          }
 }

export const LogOut = () => async (dispatch) => {
        try{
          dispatch({
            type:"REMOVE_FREELANCER_PROFILE"
           });
        dispatch({
            type:"LOG_OUT"
       });

        }catch(err){
          console.log(err)
        }
  }
