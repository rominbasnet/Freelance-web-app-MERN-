const initState = {
  businessProfile: null,
  businessProfiles: [],
  searchFreelancer: [],
  loading: true,
  errors: {}
}

const businessReducer = (state = initState, action) =>{
  switch(action.type){

    case "FETCH_BUSINESS_REQUEST":
     
      return {
        ...state,
        loading: true,
        errors: {}
     };
    
    case "FETCH_BUSINESS_PROFILE":
  
      return {
        ...state,
        businessProfile: action.payload,
        loading: false
      };
    
    case "FETCH_SEARCH_FREELANCER":
      return {
        ...state,
        searchFreelancer: action.payload,
        loading: false
      }

    case "FETCH_SEARCH_FREELANCER_ERROR": 
      return {
        ...state,
        errors: action.payload,
        loading: false
      };

    case "BUSINESS_PROFILE_ERROR":
      return {
        ...state,
        errors: action.payload,
        loading: false 
      };
    
    case "REMOVE_BUSINESS_PROFILE":
      return {
        ...state,
        loading: false,
        businessProfile: null
      };
    
    default:
      return state;
  }
}

export default businessReducer;
