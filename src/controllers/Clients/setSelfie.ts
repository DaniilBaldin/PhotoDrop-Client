/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import Client from '../../models/clients';

const setSelfie: RequestHandler = async (req, res) => {
    try {
        console.log(req);
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default setSelfie;
