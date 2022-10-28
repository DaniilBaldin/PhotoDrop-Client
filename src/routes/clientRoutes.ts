import { Router } from 'express';
import bodyParser from 'body-parser';

import loginClient from '../controllers/Clients/loginClient';
import verifyClient from '../controllers/Clients/verifyClient';
import setSelfie from '../controllers/Clients/setSelfie';

import uploader from '../middleware/uploaderMiddleware';
import authMiddleware from '../middleware/authMiddleware';

const clientRouter = Router();

clientRouter.use(bodyParser.json());

clientRouter.post('/login', loginClient);
clientRouter.post('/verify', verifyClient);
clientRouter.post('/selfie', authMiddleware, uploader.array('file'), setSelfie);

export default clientRouter;
