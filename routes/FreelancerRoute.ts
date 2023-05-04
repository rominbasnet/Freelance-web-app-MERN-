import express from 'express';
import multer from 'multer';
import {FreelancerLogin, FreelancerAuth, CreateFreelancerProfile, GetFreelancersProfile, GetFreelancerProfileById, GetIndFreelancerProfile, AddEducation, GetAssignedJobs, JobStatusToCompleted, JobStatusToInProgress} from '../controllers';
import {Authenticate} from '../middleware';


const upload = multer({ dest: 'uploads/'});
const router = express.Router();
router.post('/login', FreelancerLogin);
router.get('/auth', Authenticate, FreelancerAuth);
router.post('/createprofile', Authenticate, upload.single('image'), CreateFreelancerProfile);
router.get('/profile/individual', Authenticate, GetIndFreelancerProfile);
router.get('/allprofiles', GetFreelancersProfile);
router.put('/profile/education', AddEducation);
router.get('/profile/individual/assignedjobs', Authenticate, GetAssignedJobs);
router.put('/profile/individual/jobstatustoinprogress/:jobId', Authenticate, JobStatusToInProgress);
router.put('/profile/individual/jobstatustocompleted/:jobId', Authenticate, JobStatusToCompleted);
router.get('/profile/:freelancer_id', GetFreelancerProfileById);

export { router as FreelancerRoute};
