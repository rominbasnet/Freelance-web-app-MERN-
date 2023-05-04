//@ts-nocheck
import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose'; 
import nodemailer from 'nodemailer';
import {GeneratePassword, GenerateSalt} from '../utility';
import {Business} from '../models';
import {Freelancer} from '../models';
import {FreelancerProfileInputs} from '../dto';

const router = express.Router();


export const sendVerifyFreelancerMail = async(name, email, id) =>{
  try{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth:{
          user: 'rominbasnet56@gmail.com',
          pass: 'keshtmspdcuqwtyz'
        }
      });

     const mailOptions = {
      from: 'rominbasnet56@gmail.com',
      to: email,
      subject: 'For Verification email',
      html: '<p>Hi '+name+', please click here to <a href="http://localhost:8000/admin/freelancer/verify?id='+id+'">Verify</a>your mail.</p>' 
     }

     transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error)
      }
      else{
        console.log("Email has been sent: ", info.response);
      }
     })

  }
  catch(err){
    console.log(err)
  }
}


export const sendVerifyBusinessMail = async(name, email, id) =>{
  try{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth:{
          user: 'rominbasnet56@gmail.com',
          pass: 'keshtmspdcuqwtyz'
        }
      });

     const mailOptions = {
      from: 'rominbasnet56@gmail.com',
      to: email,
      subject: 'For Verification email',
      html: '<p>Hi '+name+', please click here to <a href="http://localhost:8000/admin/business/verify?id='+id+'">Verify</a>your mail.</p>' 
     }

     transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error)
      }
      else{
        console.log("Email has been sent: ", info.response);
      }
     })

  }
  catch(err){
    console.log(err)
  }
}


export const VerifyFreelancerMail = async (req: Request, res: Response, next: NextFunction) =>{
  try{
    const verifiedInfo = await Freelancer.updateOne({
      _id: req.query.id
    },{
      $set:{
        isVerified: true,
      }
    });
    res.send("Your email is verified.Return to app to log in");
  }
  catch(err){
    console.log(err)
  }
}

export const VerifyBusinessMail = async (req: Request, res: Response, next: NextFunction) =>{
  try{
    const verifiedInfo = await Business.updateOne({
      _id: req.query.id
    },{
      $set:{
        isVerified: true,
      }
    });
    res.send("Your email is verified.Return to app to log in");
  }
  catch(err){
    console.log(err)
  }
}



export const FindFreelancer = async(id: string| undefined, email?: string)=>{
  if(email){
    return await Freelancer.findOne({email: email});
  }
  else{
    return await Freelancer.findById(id)
  }
}

export const FindBusiness = async(id: string| undefined, email?: string)=>{
  if(email){
    return await Business.findOne({contactEmail: email});
  }
  else{
    return await Business.findById(id)
  }
}

export const FindFreelancerByUsername = async(username: string)=>{
  return await Freelancer.findOne({userName: username})
}

export const CreateFreelancer = async(req:any, res:Response, next:NextFunction)=>{
 const {firstName, lastName, userName, email, password, linkedIn, location, age, description, icon} = <FreelancerProfileInputs>req.body;
  const existingFreelancer = await FindFreelancer('', email);
  if(existingFreelancer !== null){
    return res.status(409).json({"messsage":"A freelancer exist with this email id"})
  }
  
  const existingFreelancerByUsername = await FindFreelancerByUsername(userName);
  if(existingFreelancerByUsername !== null){
     return res.status(409).json({"message":"A freelancer exist with this username"});
  }
  try{
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createdFreelancer = await Freelancer.create({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: userPassword,
    salt: salt,
    linkedIn: linkedIn,
    location: location,
    age: age,
    description: description,
    icon: icon
  })

  console.log(createdFreelancer)

  if(createdFreelancer){
    sendVerifyFreelancerMail(req.body.userName, req.body.email, createdFreelancer._id);
    res.json(createdFreelancer);
  }

  }catch(err){
     res.status(500).json(err)
  }
}

export const GetFreelancers = async(req:Request, res: Response, next: NextFunction)=>{
  const freelancers = await Freelancer.find(); //freelancers is an array
  try{
  if(freelancers !== null){
    return res.json(freelancers);
    }
  }catch(err){
    return res.json({message:"Freelancer detail not available", err: err})
  }
}

export const GetFreelancerById= async(req:Request, res:Response, next:NextFunction)=>{
  const freelancerId = req.params.id;
  if (mongoose.isValidObjectId(freelancerId)){
    const freelancer = await FindFreelancer(freelancerId);
    if (freelancer !== null){
      return res.json(freelancer)
    }
    else{
      return res.json({message:"Freelancer data not available"})
    } 
  }
  else return res.json({message:"Invalid ID"})
}

export const CreateBusiness = async (req: Request | any, res: Response, next: NextFunction)=>{
  const {companyName, contactName, contactEmail, password, location, companyDescription} = req.body as any;   
  const existingBusiness = await FindBusiness('', contactEmail);
    if(existingBusiness){
     return res.status(409).json({message:"Business already exists"});
    }
   

    try{
   
      const salt = await GenerateSalt();
      const userPassword = await GeneratePassword(password, salt);
      const createdBusiness = await Business.create({
        companyName: companyName,
        contactName: contactName,
        contactEmail: contactEmail,
        password: userPassword,
        salt: salt,
        location: location,
        companyDescription: companyDescription
    });

    if(createdBusiness){
      sendVerifyBusinessMail(req.body.companyName, req.body.contactEmail, createdBusiness._id);
      res.json(createdBusiness);
    }
    
  }catch(err){
    res.status(500).json(err);
  }


}

export const GetBusinesses = async(req: Request, res: Response, next: NextFunction)=>{
  const businesses = await Business.find({}).limit(5); //businesses is an array
  if(businesses!==null){
    return res.json(businesses);
  }
  return res.json({"message":"Business detail not available"})
}

export const GetBusinessById = async(req: Request, res: Response, next: NextFunction)=>{
  const businessId = req.params.id;
  if(mongoose.isValidObjectId(businessId)){
    const business = await FindBusiness(businessId);
    if (business !== null){
      return res.json(business);
    }
    else{
      return res.json({message:"Business data not available"});
    }
  }
  else return res.json({message:"Invalid ID"})
}
