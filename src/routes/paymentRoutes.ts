import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';

import createCheckout from '../controllers/Payment/createCheckout';

const paymentRouter = Router();

paymentRouter.use(bodyParser.json());

paymentRouter.post('/create-checkout-session', authMiddleware, createCheckout);

export default paymentRouter;
