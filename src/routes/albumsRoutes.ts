import { Router } from 'express';
import bodyParser from 'body-parser';

import getAlbumsByUser from '../controllers/Albums/getAlbumsByUser';
import getAlbumById from '../controllers/Albums/getAlbumById';

import authMiddleware from '../middleware/authMiddleware';

const albumsRouter = Router();

albumsRouter.use(bodyParser.json());

albumsRouter.get('/albums', authMiddleware, getAlbumsByUser);
albumsRouter.get('/album/:id', authMiddleware, getAlbumById);

export default albumsRouter;
