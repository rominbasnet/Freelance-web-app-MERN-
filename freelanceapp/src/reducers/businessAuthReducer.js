const initState = {
	token: localStorage.getItem("token"),
	authentication: null,
	business: null,
	loading: true,
	error: null
}

const businessAuthReducer = (state = initState, action)=>{
	switch(action.type){
		
		case "BSIGNUP_SUCCESS":
	    return {
        ...state,
        ...action.payload,
        loading: false
     }	
		case "BLOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.signature);
			return {
				...state,
				...action.payload,
				authentication: true,
				loading: false
			}
		
		case "BUSER_AUTHENTICATED":
			return {
				...state,
				authentication: true,
				loading: false,
				business: action.payload
			}
		case "BSIGNUP_FAIL":
		case "BLOGIN_FAIL":
			return{
				...state,
				error: action.payload
			}
		case "BAUTHENTICATION_ERROR":
		case "BLOG_OUT":
		
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
export default businessAuthReducer;
