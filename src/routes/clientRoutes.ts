import { Router } from 'express';
import bodyParser from 'body-parser';

import createClient from '../controllers/Clients/signUpClient';
import loginClient from '../controllers/Clients/loginClient';

const clientRouter = Router();

clientRouter.use(bodyParser.json());

clientRouter.post('/signup', createClient);
clientRouter.post('/login', loginClient);

export default clientRouter;
