const initState = {
  freelancerProfile: null,
  freelancerProfiles: [],
  freelancerInterested: [],
  assignedJobs: [],
  assignedJobLoading: true,
  githubRepository: [],
  loading: true,
  errors: {}
}

const freelancerReducer = (state = initState, action) =>{
  switch(action.type){

    case "FETCH_FREELANCER_REQUEST":
     
      return {
        ...state,
        loading: true,
        errors: {}
     };
    
    case "FETCH_FREELANCER_PROFILE":
      return {
        ...state,
        freelancerProfile: action.payload,
        loading: false
      };
    
    case "UPDATE_FREELANCER_PROFILE":
      return {
        ...state,
        freelancerProfile: action.payload,
        loading: false 
      };
    
    case "FETCH_ALLFREELANCER_PROFILES":
      return {
        ...state,
        freelancerProfiles: action.payload,
        loading: false 
      };

    case "FETCH_ASSIGNED_JOBS":
      return {
        ...state,
        assignedJobs: action.payload,
        assignedJobLoading: false
      };

    case "FETCH_FREELANCER_INTERESTED":
      return{
        ...state,
        freelancerInterested: state.freelancerInterested.concat(action.payload),
        loading: false
      };

    case "REMOVE_FREELANCER_PROFILE":
      return {
        ...state,
        freelancerProfile: null,
        freelancerProfiles: [],
        githubRepository: [],
        loading: false 
      };
    
    case "REMOVE_FREELANCER_INTERESTED":
      return{
        ...state,
        freelancerInterested: [],
        loading: false
      };

    case "FREELANCER_PROFILE_ERROR":
      return {
        ...state,
        errors: action.error,
        loading: false,
        freelancerProfile: null,
        freelancerProfiles: []
      };
    
    case "GITHUB_DATA":
      return {
        ...state,
        githubRepository: action.payload,
        loading: false 
      };
    
    default:
      return state;
  }
}

export default freelancerReducer;
