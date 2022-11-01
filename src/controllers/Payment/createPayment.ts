/* eslint-disable @typescript-eslint/no-explicit-any */
import stripe from 'stripe';

import { RequestHandler } from 'express';

const createPayment: RequestHandler = async (req, res) => {
    try {
        const paymentIntent: any = await (stripe as any).paymentIntents.create({
            amount: 1999,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        res.set('Access-Control-Allow-Private-Network', 'true');
        res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        return res.status(503).json({
            error: {
                message: (error as Error).message,
            },
            success: false,
        });
    }
};

export default createPayment;
