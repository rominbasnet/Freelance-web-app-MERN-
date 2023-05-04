import {combineReducers} from 'redux';
import freelancerReducer from './freelancerReducer';
import freelancerAuthReducer from './freelancerAuthReducer';
import businessAuthReducer from './businessAuthReducer';
import businessReducer from './businessReducer';
import jobReducer from './job';




export default combineReducers({
  freelancerReducer,
  freelancerAuthReducer,
  businessAuthReducer,
  businessReducer,
  jobReducer
})

