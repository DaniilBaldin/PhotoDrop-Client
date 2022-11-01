import { Router } from 'express';
import bodyParser from 'body-parser';

import authMiddleware from '../middleware/authMiddleware';

import createPayment from '../controllers/Payment/createPayment';
import createCheckout from '../controllers/Payment/createCheckout';

const paymentRouter = Router();

paymentRouter.use(bodyParser.json());

paymentRouter.post('/create-payment-intent', authMiddleware, createPayment);
paymentRouter.post('/create-checkout-session', authMiddleware, createCheckout);

export default paymentRouter;
