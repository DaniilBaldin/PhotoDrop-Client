/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import Client from '../../models/clients';

import InfoRequest from '../../interface/albumsInterface';

const getAlbumsByUser = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        Client.getClientById(person_id).then((result) => {
            console.log(result[0]);
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

export default getAlbumsByUser;
