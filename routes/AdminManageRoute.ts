import express, {Request, Response, NextFunction} from 'express';
import {AdminLogin, GetAllJobs, DeleteJobById} from '../controllers';
const router = express.Router();

router.post('/login', AdminLogin);
router.get('/getalljobs', GetAllJobs);
router.delete('/deletejobbyid/:id', DeleteJobById);

export { router as AdminManageRoute};
