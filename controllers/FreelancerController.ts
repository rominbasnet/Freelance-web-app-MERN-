import {Request, Response, NextFunction} from 'express';
import {FreelancerLoginInputs, ProfileType, FreelancerEducation, EducationType} from '../dto';
import {FindFreelancer} from './AdminController';
import {Freelancer, FreelancerProfile, Job} from '../models';
import {GenerateSignature, ValidatePassword} from '../utility';

export const FreelancerLogin = async(req:Request, res:Response, next: NextFunction) =>{
  const {email, password} = <FreelancerLoginInputs>req.body;
  const existingFreelancer = await FindFreelancer('', email);
  

  if(existingFreelancer !== null && existingFreelancer.isVerified === true){
    const validation = await ValidatePassword(password, existingFreelancer.password, existingFreelancer.salt);
    if(validation){
      const signature = GenerateSignature({
       _id: existingFreelancer._id,
       email: existingFreelancer.email
      })
 
      return res.status(200).json({
        signature: signature
      }) 
    }
    else{
      return res.status(403).json({message:"Password is not valid"})
    }
  }
  return res.status(404).json({message:"Login credentials failed"})
}

export const FreelancerAuth = async(req: Request | any, res: Response | any, next: NextFunction) => {
    
    const user = req.user as any;
    try{
        const freelancer = await Freelancer.findById(user._id).select('-password');
        return res.json(freelancer);
    }
    catch(err: any){
        console.error(err.message);
        res.status(500).json('Server Error');
    }
}

export const CreateFreelancerProfile = async(req: Request | any, res:Response, next: NextFunction)=>{
 
  const {company, website, student, status, githubUsername, youtube, twitter, facebook, instagram, skills, specialization} = req.body as any;
 
  const user = req.user;
  const fields: ProfileType = {};
   
  fields.freelancer = user._id;
  if(company) fields.company = company;
  if(website) fields.website = website;
  if(student) fields.student = student;
  if(status) fields.status = status;
  if(githubUsername) fields.githubUsername = githubUsername;
  if(specialization) fields.specialization = specialization;
  if(req.file) fields.image = req.file.path;
  if(skills){
    const result = skills?.split(',').map((skill: any)=>{
     return skill.trim();
    })
    fields.skills = result;
  }
  fields.social = {} ;
  if(youtube) fields.social.youtube = youtube;
  if(twitter) fields.social.twitter = twitter;
  if(instagram) fields.social.instagram = instagram;
  if(facebook) fields.social.facebook = facebook;
  try{
  const profile = await FreelancerProfile.findOne({freelancer:user._id});
  if(profile){
    const updatedProfile = await FreelancerProfile.findOneAndUpdate(
      {freelancer: user._id},
      {$set: fields},
      {new: true}
    );
  return res.json(updatedProfile)
  }
  const newProfile = await FreelancerProfile.create(fields);
  return res.json(newProfile);
  }
  catch(err){
    res.status(500).send("Server Error")
  }
}

export const GetFreelancersProfile = async (req: Request| any, res: Response)=>{
    try{
        const freelancersProfile = await FreelancerProfile.find().populate('freelancer',['linkdeln','description','userName', 'location', 'address', 'firstName', 'lastName', 'email']);
       
      if(freelancersProfile !== null){
          return res.status(200).json(freelancersProfile)
      } 
      else{
          return res.status(400).json({message:"Freelancers Profile not found"})
      }
    }
    catch(err)
    {
        res.status(500).json({ err: err});
    }
}

export const GetFreelancerProfileById = async(req:Request | any, res:Response, next:NextFunction)=>{

  try{
      const freelancerProfile = await FreelancerProfile.findOne({freelancer: req.params.freelancer_id}).populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']);         
      if(freelancerProfile !== null){
        return res.status(200).json(freelancerProfile);
      } 
      else{
        return res.status(400).json({message:"Profile not found"})
      }
    }
    catch(err){
      res.status(500).json(err);
    }  
}

export const GetIndFreelancerProfile = async(req:Request | any, res:Response, next:NextFunction)=>{
 const user = req.user;
 if(user){ 
 try{
      const freelancerProfile = await FreelancerProfile.findOne({freelancer: user._id}).populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']);         
      if(freelancerProfile !== null){
        return res.status(200).json(freelancerProfile)
      } 
      else{
        return res.status(400).json({message:"Profile not found"})
      }
    }
    catch(err){
      res.status(500).json(err);
    }  
 }
 else{
   res.status(400).json("Authentication failed")
 }
}

export const AddEducation = async(req: Request | any, res: Response, next: NextFunction) => {
    const user = req.user;
    const {courseOfStudy, university, location, from, to, description} = <FreelancerEducation>req.body;
    const freelancerEducation : EducationType = {
      courseOfStudy,
      university,
      location,
      to,
      from,
      description 
    }
    try{
         const freelancerProfile = await FreelancerProfile.findOne({freelancer: user._id}) as any;
         freelancerProfile.education.push(freelancerEducation);
         await freelancerProfile.save();
         res.json(freelancerProfile);

    }catch(err: any){
      console.log(err.message);
      res.status(500).json({ err });
    }
}


export const GetAssignedJobs = async(req:Request|any, res:Response, next:NextFunction)=>{
  const user = req.user;
  
  try{    

    const freelancerprofile = await FreelancerProfile.findOne({freelancer: user._id}).populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']); 
    if(freelancerprofile !== null){
    
    const assignedJobs = await Job.find({freelancerProfile: freelancerprofile._id, status: "assigned"}).populate('business',['location','companyDescription','contactEmail','contactName']).sort({date: -1});

  
      if(assignedJobs){
        return res.json(assignedJobs);
      }
      else{
        return res.json({message: "No Jobs Assigned"})
      }

    }
    else{
       return res.status(400).json({message:"Profile not found"})
 
    }

  }catch(err){
    return res.status(500).json({err});
  }

}

export const JobStatusToInProgress = async (req:Request|any, res:Response, next:NextFunction) => {
  const user = req.user;
  const {jobId} = req.params; 
 
  const freelancerprofile = await FreelancerProfile.findOne({freelancer: user._id}).populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']); 
  
  if(freelancerprofile !== null){
  try{
    const job = await Job.findOne({
      _id: jobId,
      freelancerProfile: freelancerprofile._id 
    })
    if(job === null){
      return res.status(404).json({msg: "Job not assigned to freelancer"});
    }
    
    if(job.status === 'assigned'){
      job.workStatus = 'In-Progress';
      await job.save();
    }

    }catch(err){
      res.status(500).json({msg: "sever error occured"})
    }
  }
  else{
    res.status(500).json({msg:"FreelancerProfile not found"})
  }

}

export const JobStatusToCompleted = async (req:Request|any, res:Response, next:NextFunction) => {
  const user = req.user;
  const {jobId} = req.params; 


  const freelancerprofile = await FreelancerProfile.findOne({freelancer: user._id}).populate('freelancer',['userName','firstName','lastName','email','description','linkedIn','location']); 
 
  if(freelancerprofile !== null){
  try{
    
    const job = await Job.findOne({
      _id: jobId,
      freelancerProfile: freelancerprofile._id 
    })
    
    if(job === null){
      return res.status(404).json({msg: "Job not assigned to freelancer"});
    }
    if(job.status === 'assigned'){

      job.workStatus = "Completed";

      await job.save();
     
    }
   
    }catch(err){
      res.status(500).json({msg: "sever error occured"})
    }
  }
  else{
    res.status(500).json({msg:"FreelancerProfile not found"})
  }

}
