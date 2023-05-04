import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import {FreelancerPayload} from '../dto';

export const GenerateSalt = async() =>{
  return await bcrypt.genSalt();
}

export const GeneratePassword = async(password: string, salt: string)=>{
  return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async(enteredPassword: string, savedPassword: string, salt: string)=>{
  return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = (payload: FreelancerPayload)=>{
  return jwt.sign(payload, APP_SECRET, {expiresIn: '1d'});
}

export const ValidateSignature = async(req: Request | any) =>{
  const signature = req.header('Authorization');
  
  if(signature){
    const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
    req.user = payload;
    return true;
  }
  return false;
}
