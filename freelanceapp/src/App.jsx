import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TestComponent from './BusinessComponents/TestComponent';
import RecommendComponent from './BusinessComponents/RecommendComponent';
import freelancerAuthToken from './utilities/freelancerAuthToken';
import businessAuthToken from './utilities/businessAuthToken';
import {loadFreelancer} from './actions/freelancerAuthAction';
import {loadBusiness} from './actions/businessAuthAction';
import Landing from './Components/Landing';
import BusinessLogin from './BusinessComponents/BusinessLogin';
import BusinessDashboard from './BusinessComponents/BusinessDashboard';
import BusinessRegister from './BusinessComponents/BusinessRegister';
import FreelancerLogin from './Components/FreelancerLogin';
import FreelancerRegister from './Components/FreelancerRegister';
import FreelancerDashboard from './Components/FreelancerDashboard';
import FreelancerProfileCreate from './Components/FreelancerProfileCreate';
import FreelancerProfileEdit from './Components/FreelancerProfileEdit';
import FreelancersProfileView from './Components/FreelancersProfileView';
import EducationList from './Components/EducationList';
//import PostJob from './BusinessComponents/PostJob';
import NewPostJob from './BusinessComponents/NewPostJob';
import PostedJob from './BusinessComponents/PostedJob';

import Protected from './BusinessComponents/Protected';

import Test from './Components/test';
import {Provider} from 'react-redux'; 
import store from './store';
import AdminLogin from './AdminComponent/AdminLogin';
import AdminDashboard from './AdminComponent/AdminDashboard';
import Map from './BusinessComponents/Map';

if(localStorage.token){
   freelancerAuthToken(localStorage.token)
}



const App = () => {
  useEffect(()=>{
     store.dispatch(loadFreelancer());

    }, [])
  return (
    <div className="App">
    <Provider store= {store}>
    <Router>
    <Routes>
    <Route path='/' element= {<Landing />}></Route>
    <Route path='/businesslogin' element= {<BusinessLogin />}></Route>
    <Route path='/businessregister' element= {<BusinessRegister />}></Route>
    <Route path='/freelancerregister' element= {<FreelancerRegister />}></Route>
    <Route path='/freelancerlogin' element= {<FreelancerLogin />}></Route>
    <Route path='/createfreelancerprofile' element= {<FreelancerProfileCreate />}></Route>
    <Route path='/editfreelancerprofile' element= {<FreelancerProfileEdit />}></Route>
    <Route path='/businessdashboard' element= {<BusinessDashboard />}></Route>
    <Route path='/freelancerdashboard' element= {<FreelancerDashboard />}></Route>
    <Route path='/educationlist' element= {<EducationList />}></Route>
    <Route path='/postjob' element={<Protected Component={NewPostJob} />}></Route>
    <Route path='/postedjob' element={<PostedJob />}></Route>

    <Route path='/newpostjob' element={<NewPostJob />}></Route>
    
    <Route path='/protected/admin/login' element={<AdminLogin />}></Route>
    <Route path='/protected/admin/admindashboard' element={<AdminDashboard />}></Route>

    <Route path='/testcomponent' element={<TestComponent />}></Route>
    <Route path='/recommendcomponent' element={<RecommendComponent />}></Route>
    <Route path='/freelancersprofileview' element= {<FreelancersProfileView />}></Route>
    <Route path='/test' element={<Test />}></Route>

    <Route path='/business/map' element={<Map />}></Route>

    </Routes>
    </Router>
    </Provider>
    </div>
  )
}

export default App;

