import express, {Request, Response, NextFunction} from 'express';
import multer from 'multer';
import {CreateFreelancer, VerifyFreelancerMail, VerifyBusinessMail, GetFreelancers, GetFreelancerById, CreateBusiness, GetBusinesses, GetBusinessById} from '../controllers';

//const uploadnew = multer({ dest: 'uploadbusiness/'});

const router = express.Router();
router.post('/business', CreateBusiness);
router.get('/business/verify',VerifyBusinessMail);
router.get('/businesses', GetBusinesses);
router.get('/business/:id', GetBusinessById);

router.post('/freelancer', CreateFreelancer);
router.get('/freelancer/verify',VerifyFreelancerMail);
router.get('/freelancers', GetFreelancers);
router.get('/freelancer/:id', GetFreelancerById);

export { router as AdminRoute};
