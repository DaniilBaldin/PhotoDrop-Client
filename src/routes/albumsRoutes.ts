import { Router } from 'express';
import bodyParser from 'body-parser';

import getAlbumsByUser from '../controllers/Albums/getAlbumsByUser';
import getPhotosByAlbum from '../controllers/Albums/getAllPhotosByAlbum';

import authMiddleware from '../middleware/authMiddleware';

const albumsRouter = Router();

albumsRouter.use(bodyParser.json());

albumsRouter.get('/albums', authMiddleware, getAlbumsByUser);
albumsRouter.get('/album/:id', authMiddleware, getPhotosByAlbum);

export default albumsRouter;
