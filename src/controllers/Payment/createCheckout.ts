/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
dotenv.config();

const stripe_key = process.env.STRIPE_SECRET_KEY as any;

import Stripe from 'stripe';
const stripe = new Stripe(stripe_key, {
    apiVersion: '2022-08-01',
});

import { RequestHandler } from 'express';

const createCheckout: RequestHandler = async (req, res) => {
    try {
        console.log(req);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Album',
                        },
                        unit_amount: 500,
                    },
                    quantity: 1,
                },
            ],
            success_url: 'https://photographers-client.vercel.app/',
            cancel_url: 'https://photographers-client.vercel.app/',
        });
        res.json({ url: session.url });
    } catch (error) {
        return res.status(503).json({
            error: {
                message: (error as Error).message,
            },
            success: false,
        });
    }
};

export default createCheckout;
