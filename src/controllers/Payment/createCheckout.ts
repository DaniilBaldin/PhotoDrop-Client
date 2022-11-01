/* eslint-disable @typescript-eslint/no-explicit-any */
import stripe from 'stripe';

import { RequestHandler } from 'express';

const createCheckout: RequestHandler = async (req, res) => {
    try {
        const session = await (stripe as any).checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Item 1',
                        },
                        unit_amount: 20000,
                    },
                    quantity: 2,
                },
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Item 2',
                        },
                        unit_amount: 50000,
                    },
                    quantity: 10,
                },
            ],
            success_url: 'http://localhost:5173/photos',
            cancel_url: 'http://localhost:5173/',
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
