/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
dotenv.config();

const stripe_key = process.env.STRIPE_SECRET_KEY as any;

import Stripe from 'stripe';
const stripe = new Stripe(stripe_key, {
    apiVersion: '2022-08-01',
});

import { Response } from 'express';

import InfoRequest from '../../interface/albumsInterface';

const createCheckout = async (req: InfoRequest, res: Response) => {
    try {
        const protocol = req.protocol;
        console.log(protocol);
        const session: any = await stripe.checkout.sessions.create({
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
            phone_number_collection: {
                enabled: true,
            },
            success_url: protocol + '://' + req.get('host'),
            cancel_url: protocol + '://' + req.get('host'),
        });
        res.json({
            data: {
                url: session.url,
            },
            success: true,
        });
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
