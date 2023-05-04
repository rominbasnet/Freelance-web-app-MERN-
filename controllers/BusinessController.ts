import {Request, Response, NextFunction} from 'express';
import {BusinessLoginInputs, BusinessProfileInputs, BusinessProfileType} from '../dto';
import {FindBusiness} from './AdminController';
import {Business, BusinessProfile, FreelancerProfile, Job} from '../models';
import {GenerateSignature, ValidatePassword} from '../utility';

export const BusinessLogin = async(req:Request, res:Response, next: NextFunction) =>{
  const {email, password} = <BusinessLoginInputs>req.body;
  const existingBusiness = await FindBusiness('', email);

  if(existingBusiness !== null && existingBusiness.isVerified === true){
    const validation = await ValidatePassword(password, existingBusiness.password, existingBusiness.salt);
    if(validation){
      const signature = GenerateSignature({
       _id: existingBusiness._id,
       email: existingBusiness.contactEmail
      })

      return res.status(200).json({
        signature: signature
      }) 
    }
    else{
      return res.status(403).json({message:"Password is not valid"})
    }
  }
  return res.status(404).json({message:"Login credentials not valid"})
}

export const BusinessAuth = async(req: Request | any, res: Response | any, next: NextFunction) => {
    
    const user = req.user as any;
    try{
        const business = await Business.findById(user._id).select('-password');
        return res.json(business);
    }
    catch(err: any){
        console.error(err.message);
        res.status(500).json('Server Error');
    }
}


export const CreateBusinessProfile = async(req: Request | any, res:Response, next: NextFunction)=>{

  const { status, website, established, companyCategory, employeeCount } = <BusinessProfileInputs>req.body;
  const user = req.user;

  const fields: BusinessProfileType = {};

  fields.business = user._id;
  if(established) fields.established = established;
  if(website) fields.website = website;
  if(status) fields.status = status;
  if(companyCategory) fields.companyCategory = companyCategory;
  if(req.file) fields.businessImage = req.file.path;
  try{
  const profile = await BusinessProfile.findOne({business:user._id});
  if(profile){
    const updatedProfile = await BusinessProfile.findOneAndUpdate(
      {business: user._id},
      {$set: fields},
      {new: true}
    );
  return res.json(updatedProfile)
  }
  const newProfile = await BusinessProfile.create(fields);


  console.log(newProfile )
  return res.json(newProfile);
  }
  catch(err){
    res.status(500).send("Server Error")
  }
}


export const GetBusinessProfiles= async (req:Request | any, res:Response, next:NextFunction) =>{
    try{
        const businessProfiles = await BusinessProfile.find().populate('business',['location','companyDescription']) as any;
        res.json(businessProfiles);
    }
    catch(err:any)
    {
        res.status(500).json({err: err})
    }
}

export const GetIndBusinessProfile = async (req:Request|any, res: Response, next: NextFunction) => {
  
  const user = req.user; 
  try{
        const businessProfile = await BusinessProfile.findOne({business: user._id}).populate('business',['location','companyDescription']);

        if(businessProfile !== null){
            return res.status(200).json(businessProfile);
        }
        else{
            return res.status(400).json({message:"Profile not found"})

        }
    }
    catch(err: any)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const GetBusinessProfileById = async(req: Request| any, res: Response, next: NextFunction)=>{
    try{
        const businessProfileById = await BusinessProfile.findOne({business: req.params.business_id})
        .populate('business',['location','companyDescription']) as any;


        if(!businessProfileById){
            return res.status(400).json({msg:'There is no profile for this Business'});
        }

        res.json(businessProfileById)
    }
    catch(err: any)
    {
        res.status(500).json({err: err});
    }
}

export const RateFreelancer = async(req: Request | any, res: Response, next: NextFunction) =>{
  const { rating, jobId} = req.body;
  const {freelancerId} = req.params;
  const freelancerProfile = await FreelancerProfile.findById(freelancerId);
  const job = await Job.findById(jobId);
  if (!freelancerProfile) {
    return res.json('Freelancer with ID  not found');
  }
  if(!job){
    return res.json('Job with this id not found');
  }
  if(job.rated !== true){
  const newRating = (freelancerProfile.rating * freelancerProfile.ratingCount + rating) / (freelancerProfile.ratingCount + 1);
  freelancerProfile.rating = newRating;
  freelancerProfile.ratingCount += 1;
  job.rated = true;
  await freelancerProfile.save();
  await job.save();
  
  console.log(freelancerProfile);  
  
  return res.json(job);
  }
  else{
    return res.json('Freelancer is already rated for the job');
  }
}

export const SearchFreelancer = async(req: Request | any, res: Response, next: NextFunction)=>{
      const {skill} = req.query;
      const skillset = skill.split(',').map((str:any) => str.trim());
  try {
    const freelancerresults = await FreelancerProfile.find({
      skills:  { $in: skillset }
    }).populate('freelancer',['linkdeln','description','userName', 'location', 'firstName', 'lastName', 'email']);

    console.log(freelancerresults);
    return res.status(200).json(freelancerresults);
  } catch (err) {
    return res.status(404).json({msg:"No jobs available"});
  }
}
