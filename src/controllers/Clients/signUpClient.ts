import { RequestHandler } from 'express';

import Client from '../../models/clients';

const createClient: RequestHandler = (req, res) => {
    try {
        const { email, login } = req.body;
        const dateCreated = new Date().toISOString();
        // await Client.save()
        res.status(201).json({
            message: 'User created!',
            success: true,
        });
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default createClient;
