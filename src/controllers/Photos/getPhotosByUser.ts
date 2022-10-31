/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import Client from '../../models/clients';
import Photo from '../../models/photo';

import InfoRequest from '../../interface/albumsInterface';

const getPhotosByUser = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        Client.getClientById(person_id).then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            const phone_number = resultParsed[0].phone_number;
            await Photo.getPhotosByNumber(phone_number).then((result) => {
                console.log(result[0]);
                res.status(200).json({
                    data: result[0],
                    success: true,
                });
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

export default getPhotosByUser;
