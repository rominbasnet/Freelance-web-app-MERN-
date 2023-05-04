import express from 'express';
import multer from 'multer';
import {BusinessLogin, BusinessAuth, CreateBusinessProfile, GetBusinessProfiles, GetIndBusinessProfile, GetBusinessProfileById, RateFreelancer, SearchFreelancer} from '../controllers';
import {Authenticate} from '../middleware';
const router = express.Router();

const upload2 = multer({ dest: 'uploadbusiness/'});

router.post('/login', BusinessLogin);
router.get('/auth', Authenticate, BusinessAuth);
router.get('/searchfreelancer',SearchFreelancer);
router.post('/createprofile', Authenticate, upload2.single('businessImage'), CreateBusinessProfile);
router.get('/profile/individual', Authenticate, GetIndBusinessProfile);
router.get('/profile/:business_id', GetBusinessProfileById);
router.post('/profile/rating/:freelancerId', RateFreelancer)


export { router as BusinessRoute};
