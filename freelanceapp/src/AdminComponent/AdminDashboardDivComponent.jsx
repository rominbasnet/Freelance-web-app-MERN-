import AdminJobView from './AdminJobView';

const AdminDashboardDivComponent = ({showFreelancersDiv, jobs}) =>{

    return(
      <>
      {
        jobs.map((job,i)=>{
          return <AdminJobView 
              key={i}
              id={job._id}
              date={job.date}
              jobTitle={job.jobTitle}
              jobDescription= {job.jobDescription}
              skillSetReq= {job.skillSetReq}
              jobBudget= {job.jobBudget}
              business= {job.business}
              interested= {job.interested}
          />
        })
      }
      </>
    )
  }  


export default AdminDashboardDivComponent;
