import {Request, Response, NextFunction} from 'express';
import {Freelancer, FreelancerProfile, Business, BusinessProfile, Job} from '../models';
import {CreateJobInputs} from '../dto';

export const CreateJob = async (req:Request | any, res:Response, next: NextFunction)=>{
  
  const user = req.user;
  
  const {jobTitle, jobDescription, jobDuration, jobBudget, skillSetReq} = <CreateJobInputs>req.body;
    if(user){
    
    try{      
      const business: any = await Business.findById(user._id);
      const businessProfile: any = await BusinessProfile.findOne({
        business: business._id
      })
  
      const newSkillSetReq = skillSetReq.split(',').map((skill: any) =>{
        return skill.toLowerCase().trim(); 
        })
      const createdJob = await Job.create({
        business: user._id,
        companyName: business.companyName,
        location: business.location,
        jobTitle: jobTitle,
        skillSetReq: newSkillSetReq,
        jobDescription: jobDescription,
        jobDuration: jobDuration,
        jobBudget: jobBudget,
        image: businessProfile.businessImage
      }) 
      
      return res.json(createdJob);
    }catch(err){
      return res.status(500).json({ msg:err }) 
    }    
  }
  
  else{
    return res.status(400).json({msg:"Business Not Validated"})
  }
}            

export const GetJobs = async(req:Request | any, res: Response, next: NextFunction)=>{
  const user = req.user as any;
  if(user){
    try{
      const jobs: any = await Job.find().sort({date: -1})
                  .populate('business',['location','companyDescription','contactEmail','contactName']);
      
      return res.json(jobs);

    }catch(err){
      return res.status(500).json({err: err})
    }
  }
  else{
    console.log("Freelancer is not authenticated");
  }
}

export const SearchJob = async(req: Request | any, res: Response, next: NextFunction)=>{
      const {skill} = req.query;
      const skills = skill.split(',').map((str:any) => str.trim());
  try {
    const jobresults = await Job.find({
      skillSetReq:  { $in: skills }
    }).populate('business',['location','companyDescription','contactEmail','contactName']);

    console.log(jobresults);
    return res.status(200).json(jobresults);
  } catch (err) {
    return res.status(404).json({msg:"No jobs available"});
  }
}

export const GetJobById = async(req: Request | any, res: Response, next: NextFunction)=>{
  const user = req.user as any;
  try{
    const job: any = await Job.findById(req.params.id);
    if(job !== null){
        return res.json(job);
    }
    return res.status(404).json({msg: "Job not found"});

  }catch(err){
    return res.status(500).json({err}); 
  }
}

export const Interested = async(req: Request|any, res: Response, next: NextFunction)=>{
  const user = req.user;
  try{
    const job: any = await Job.findById(req.params.id);
    const freelancer: any = await Freelancer.findById(user._id); //we should use freelancer token in this interested route
    const interestedJob = job.interested.filter((interest:any) => interest.user.toString() === req.user._id)
    
    if (interestedJob.length > 0){
      return res.status(400).json({msg: "Already interested in the job"})
    }
    
    const newinterested = {
      user: freelancer._id,
      email: freelancer.email,
      firstName: freelancer.firstName,
      lastName: freelancer.lastName,
      location: freelancer.location,
      description: freelancer.description,
      linkedIn: freelancer.linkedIn
    }
    job.interested.unshift(newinterested);
    await job.save();
    
    return res.status(200).json(job.interested); 

  }catch(err){
    res.status(500).json({err:"ds"});
  }
}

export const NotInterested = async(req: Request|any, res: Response, next: NextFunction)=>{
  const user = req.user;
  try{
    const job: any = await Job.findById(req.params.id);
    const interestedJob = job.interested.filter((interest:any) => interest.freelancer.toString() === req.user._id);
    
    if (interestedJob.length === 0){
      return res.status(400).json({msg: "No interest shown for the job"})
    }
      
    const newInterested = job.interested.map((interest: any) => interest.freelancer.toString()); 
    const index = newInterested.indexOf(user._id);
    job.interested.splice(index,1);
    await job.save();   
    return res.json(job.interested); 

  }catch(err){
    res.status(500).json({err});
  }
}

export const AssignJob = async (req: Request, res: Response, next: NextFunction)=> {
  const {freelancerProfileId} = req.body;
  try {
    const job = await Job.findById(req.params.id);

    // Check if job exists
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job is already assigned or completed
    if (job.status === 'assigned') {
      return res.status(400).json({ message: 'Job is already assigned or completed' });
    }

    // Update job status to "assigned" and update freelancer id
    job.status = 'assigned';
    job.freelancerProfile = freelancerProfileId;
    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
















