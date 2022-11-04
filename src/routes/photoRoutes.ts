import { Router } from 'express';
import bodyParser from 'body-parser';

import getPhotosByUser from '../controllers/Photos/getPhotosByUser';

import authMiddleware from '../middleware/authMiddleware';

const photoRouter = Router();

photoRouter.use(bodyParser.json());

photoRouter.get('/photos', authMiddleware, getPhotosByUser);

export default photoRouter;
