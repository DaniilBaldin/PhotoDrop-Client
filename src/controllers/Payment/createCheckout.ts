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
        const album_id = req.body.album_id;
        const person_id = req.person.id;
        console.log(album_id, person_id);
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
                            name: album_id,
                        },
                        unit_amount: 500,
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5173/album/${album_id}`,
            cancel_url: 'http://localhost:5173',
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
