const initState = {
	token: localStorage.getItem("token"),
	authentication: null,
	user: null,
	loading: true,
	error: null
}

const freelancerAuthReducer = (state = initState, action)=>{
	switch(action.type){
		
		case "SIGNUP_SUCCESS":
	    return {
        ...state,
        ...action.payload,
        loading: false
     }	
		case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.signature);
			return {
				...state,
				...action.payload,
				authentication: true,
				loading: false
			}
		
		case "USER_AUTHENTICATED":
			return {
				...state,
				authentication: true,
				loading: false,
				user: action.payload
			}
		case "SIGNUP_FAIL":
		case "LOGIN_FAIL":
			return{
				...state,
				error: action.payload
			}
		case "AUTHENTICATION_ERROR":
		case "LOG_OUT":
		
      localStorage.removeItem("token");
			return {
				...state,
        		user: null,
				token: null,
        		loading: false,
       			authentication: false,
       			error: null
			}
		default: 
			return state;
	}
}
export default freelancerAuthReducer;
