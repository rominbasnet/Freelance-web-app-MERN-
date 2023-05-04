import express from 'express';
import {CreateJob, GetJobs, GetJobById, SearchJob, GetRecommendation, Interested, NotInterested, AssignJob } from '../controllers';
import {Authenticate} from '../middleware';

const router = express.Router();
router.post('/createjob', Authenticate, CreateJob);
router.get('/searchjobs',SearchJob);
router.get('/getjobs', Authenticate, GetJobs);
router.get('/getjobbyid/:id', Authenticate, GetJobById);
router.put('/interested/:id', Authenticate, Interested);
router.put('/uninterested/:id', Authenticate, NotInterested);
router.put('/assign/:id', AssignJob);
router.get('/recommend/:id', GetRecommendation);
export {router as JobRoute};
