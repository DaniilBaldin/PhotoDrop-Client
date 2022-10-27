import { Router } from 'express';
import bodyParser from 'body-parser';

import loginClient from '../controllers/Clients/loginClient';
import verifyClient from '../controllers/Clients/verifyClient';

const clientRouter = Router();

clientRouter.use(bodyParser.json());

clientRouter.post('/login', loginClient);
clientRouter.post('/verify', verifyClient);

export default clientRouter;
