const initState = {
    job : null,
    jobs: [],
    searchJob: [],
    loading : true,
    errors: null,
    success: false 
}


const jobReducer= (state = initState, action) =>{
    switch(action.type) {
        case "FETCH_JOBS" : 
        case "FETCH_UPDATE_JOBS":
        return {
            ...state,
            jobs : action.payload,
            loading: false

        };

        case "FETCH_JOB": 
        return {
            ...state,
            job: action.payload,
            loading: false
        };
        
      case "FETCH_SEARCH_JOB":
        return {
          ...state,
          searchJob: action.payload,
          loading: false
        }

        case "FETCH_ADD_JOB" : 
        return {
            ...state,
            jobs: [...state.jobs, action.payload],
            loading: false,
            errors: null,
            success: true
        
        };
        
        case "FETCH_JOBS_ERROR": 
        return {
            ...state,
            errors: action.payload,
            loading: false,
            success: false
        };

        case "FETCH_UPDATE_INTERESTED":    
        return {
            ...state,
            jobs : state.jobs.map(job => job._id === action.payload.id ? {
                ...job, 
                interested: action.payload.interested } : job),
            loading: false   
        };

        default:
            return {
                ...state
            }
    }
}
export default jobReducer;
