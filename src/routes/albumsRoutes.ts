import { Router } from 'express';
import bodyParser from 'body-parser';

import getAlbumsByUser from '../controllers/Albums/getAlbumsByUser';

import authMiddleware from '../middleware/authMiddleware';

const albumsRouter = Router();

albumsRouter.use(bodyParser.json());

albumsRouter.get('/albums', authMiddleware, getAlbumsByUser);

export default albumsRouter;
