import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FreelancersProfileView from './FreelancersProfileView';
import FreelancerView from './FreelancerView';
import {getAllFreelancerProfiles} from '../actions/freelancerAction';

const FreelancerDivContent = ({showFreelancersDiv, jobs}) =>{
  const dispatch = useDispatch(); 
  const {freelancerProfiles,loading} = useSelector((state) => state.freelancerReducer);
  useEffect(() => {
    dispatch(getAllFreelancerProfiles());
  },[dispatch])

  if(showFreelancersDiv){
    return (
      <FreelancersProfileView freelancerProfiles = {freelancerProfiles} />
    )
  }
  
  if(!showFreelancersDiv){
    return(
      <>
      {
        jobs.map((job,i)=>{
          return <FreelancerView 
              key={i}
              id={job._id}
              date={job.date}
              jobTitle={job.jobTitle}
              jobDescription= {job.jobDescription}
              skillSetReq= {job.skillSetReq}
              jobBudget= {job.jobBudget}
              business= {job.business}
              image={job.image}
              interested= {job.interested}
          />
        })
      }
      </>
    )
  }  

}
export default FreelancerDivContent;
