/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import Client from '../../models/clients';
import Photo from '../../models/photo';

import InfoRequest from '../../interface/albumsInterface';

const getClientData = async (req: InfoRequest, res: Response) => {
    try {
        const person_id = req.person.id;
        Client.getClientById(person_id).then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            const client_name = resultParsed[0].client_name;
            const phone_number = resultParsed[0].phone_number;
            const selfie_image = resultParsed[0].selfie_image;
            res.status(200).json({
                data: {
                    client_name: client_name,
                    phone_number: phone_number,
                    selfie_image: selfie_image,
                },
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

export default getClientData;
