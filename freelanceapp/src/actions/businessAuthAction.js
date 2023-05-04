import axios from 'axios';
import businessAuthToken from '../utilities/businessAuthToken';

export const loadBusiness = () => async dispatch =>{
	if(localStorage.token){
		businessAuthToken(localStorage.token);
	}
	try{
		const response = await axios.get('http://localhost:8000/business/auth')
    if(response?.data ){
      dispatch({
		    type: "BUSER_AUTHENTICATED",
		    payload: response.data
	    })
    }
	}
	catch(err){
		dispatch({
			type: "BAUTHENTICATION_ERROR"
		})
	}
}

export const businessRegister = ({
    companyName,
    contactName,
    contactEmail,
    password,
    location,
    companyDescription
}) => async (dispatch) => {

        try{
           const response = await axios.post('http://localhost:8000/admin/business',
                        JSON.stringify({
                                companyName,
                                contactName,
                                contactEmail,
                                password,
                                location,
                                companyDescription
                            }),
                            {
                                headers: {
                                'Content-Type': 'application/json'
                                }
                            }
                            );
           console.log(response.data)
           dispatch({
                type: "BSIGNUP_SUCCESS",
                payload: response.data 
           });


        }
       catch(err){
        dispatch({
            type: "BSIGNUP_FAIL"
       });
      }
}

export const loginBusiness = ({
	email,
	password
	}) => async (dispatch) => {
        try{
            const response = await axios.post('http://localhost:8000/business/login',
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
                type: "BLOGIN_SUCCESS",
                payload: response.data 
            });

            dispatch(loadBusiness());
            
        }
        catch(err){
            console.log(err);
            dispatch({
              type: "BLOGIN_FAIL",
              payload: err.response.data.message
           });
          }
 }

export const BLogOut = () => async (dispatch) => {
        try{
          dispatch({
            type:"REMOVE_BUSINESS_PROFILE"
           });
        dispatch({
            type:"BLOG_OUT"
       });

        }catch(err){
          console.log(err)
        }
  }
