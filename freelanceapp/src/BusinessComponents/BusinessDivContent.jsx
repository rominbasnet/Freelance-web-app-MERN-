import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BusinessView from './BusinessView';
import {getAllFreelancerProfiles} from '../actions/freelancerAction';

const BusinessDivContent = () =>{
  const dispatch = useDispatch(); 
  const {freelancerProfiles,loading} = useSelector((state) => state.freelancerReducer);
 
  useEffect(() => {
    dispatch(getAllFreelancerProfiles());
  },[dispatch])
    return(
      <>
      {
        freelancerProfiles.map((profile,i)=>{
          return <BusinessView 
              key={i}
              id={profile._id}
              freelancer={profile.freelancer}
              website={profile.website}
              status={profile.status}
              githubUsername={profile.githubUsername}
              skills={profile.skills}
              rating={profile.rating}
              specialization={profile.specialization}
              image={profile.image}
              student={profile.student}
              date={profile.date}
          />
        })
      }
      </>
    )  

}
export default BusinessDivContent;
