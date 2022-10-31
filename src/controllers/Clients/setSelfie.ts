/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import InfoRequest from '../../interface/albumsInterface';

import Client from '../../models/clients';
import uploader from '../../services/uploader';

const setSelfie = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        const files = req.files;
        await uploader(files, person_id);
        Client.getClientById(person_id).then((result) => {
            res.status(200).json({
                data: result[0],
                success: true,
            });
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

export default setSelfie;
