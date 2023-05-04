import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FreelancerJobAssignedView from './FreelancerJobAssignedView';
import {getAssignedJob} from '../actions/freelancerAction';

const AssignedJob = () => {
    const { assignedJobs, assignedJobLoading} = useSelector((state) => state.freelancerReducer);
    const dispatch = useDispatch();  

    useEffect(()=>{
      dispatch(getAssignedJob());
    },[dispatch])
 
  return (
     <div className=" w-8/12 rounded-lg items-center justify-center overflow-hidden  py-2 pl-4 pr-4  sm:py-12">
      {!assignedJobLoading && assignedJobs.length> 0?
        (assignedJobs.map((job,i)=>{
          return(
          <>
            <FreelancerJobAssignedView 
                key={i}
                id={job._id}
                date={job.date}
                jobTitle={job.jobTitle}
                jobDescription= {job.jobDescription}
                skillSetReq= {job.skillSetReq}
                jobBudget= {job.jobBudget}
                business= {job.business}
                status= {job.status}
                workStatus= {job.workStatus}
             />

          </>
          )
        }))
        :
        (
          <>
          <h1 className="text-gray-300">no assigned job</h1>
          </>
        )
      }
      </div>
    

  )
}

export default AssignedJob;
